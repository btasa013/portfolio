"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import CodeBlock from '@/components/CodeBlock';
import ContentPicture from '@/components/ContentPicture';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';

const interfaces = <div className="*:my-8">
  <div className="flex flex-wrap gap-4">
    <CodeBlock>
        {`
          // Room.cs
          private void Init()
          {
              // Gather all objects in the room.
              MonoBehaviour[] objects = GetComponentsInChildren<MonoBehaviour>(true);

              // Add checkpoints and room exits to dictionaries.
              checkpoints.AddEnumerable(objects.OfType<Checkpoint>());
              roomExits.AddEnumerable(objects.OfType<RoomExit>());

              // Get all resettable objects.
              resettables = objects.OfType<IResettable>().ToArray();
          }

          public void Reset()
          {
              // Reset all resettable objects.
              foreach (IResettable obj in resettables)
                  obj.Reset();
          }
      `}
    </CodeBlock>
    <CodeBlock>
      {`
        // An interface for objects that are reset
        // after the player dies or a room is reloaded.
        public interface IResettable
        {
            void Reset();
        }
      `}
    </CodeBlock>
  </div>
  <div className="md:max-w-2/3">
    The original Room script had separate arrays for different objects which I would have to add new objects to manually.
    The updated scripts use interfaces to fetch all needed objects at runtime, so now the only thing I need
    to do is implement IResettable on the object and it will automatically be fetched when the room is instantiated
    and reset when needed.
  </div>
  <CodeBlock>
    {`
      // Recharge.cs
      public class Recharge : MonoBehaviour, IResettable
      {
          [SerializeField] private SpriteRenderer spriteRenderer;
          [SerializeField] private Sprite activeSprite;
          [SerializeField] private Sprite inactiveSprite;

          private bool used = false;

          public void Reset()
          {
              used = false;
              spriteRenderer.sprite = activeSprite;
          }

          ...
      }
    `}
  </CodeBlock>
  <div className="md:max-w-2/3">
    Example of IResettable being implemented on an object. The Recharge object allows the player to
    jump and recharge their abilities midair. When the room is reloaded or the player dies, it is reset
    and can be used again.
  </div>
</div>;
const customRuleTileScript = <div className="*:my-8">
  <div className="flex flex-wrap gap-4">
    <CodeBlock>
      {`
        [CreateAssetMenu(menuName = "Tiles/GroundRuleTile")]
        public class GroundRuleTile : RuleTile<GroundRuleTile.Neighbor>
        {
            // The tile spritesheet
            public Texture2D spriteSheet;

            // The individual tiles
            [SerializeField, HideInInspector] private Sprite[] sprites;

            private void OnValidate()
            {
        #if UNITY_EDITOR
                if (spriteSheet != null)
                {
                    string path = UnityEditor.AssetDatabase.GetAssetPath(spriteSheet);

                    // Load all sprites in ascending order.
                    sprites = UnityEditor.AssetDatabase
                        .LoadAllAssetsAtPath(path)
                        .OfType<Sprite>()
                        .OrderBy(s => int.Parse(s.name.Split("_").Last()))
                        .ToArray();

                    UnityEditor.EditorUtility.SetDirty(this);
                }
        #endif
            }

            // Rule generation left out for sake of length.
            ...
        }
      `}
    </CodeBlock>
    <ContentPicture
      path={asset("custom_ruletile.png")}
      description="A screenshot of the generated rule tile."
    />
  </div>
  <p className="md:max-w-2/3">
    GroundRuleTile is a script that takes a spritesheet and generates the correct
    tiling rules automatically. The tiling rules are hard-coded in the script
    which means the spritesheets need to follow a predefined layout, but the custom
    script saves a bunch of time that would be spent redefining each tiling rule for
    every ground tile type.
  </p>
</div>;
const cameraScrolling = <div className="*:my-8">
  <CodeBlock>
    {`
      public class ScrollCamera : MonoBehaviour
      {
          [SerializeField] private Camera camera;
          [SerializeField] private Transform player;
          [SerializeField] private Vector2 distance;
          [SerializeField] private float smoothTime;
          [SerializeField] private float maxSpeed;

          private Vector2 cameraSize;
          private Vector2 playerPos;

          // Minimum and maximum room bounds.
          private Vector2 minBounds;
          private Vector2 maxBounds;

          private Vector2 velocity = Vector2.zero;

          private void LateUpdate()
          {
              SmoothDamp();
          }

          private void SmoothDamp()
          {
              Vector2 cameraPos = transform.position;

              Vector2 newPlayerPos = player.position;
              Vector2 deltaPos = newPlayerPos - playerPos;

              // Only scroll camera if the player has moved enough.
              bool enabledX = Mathf.Abs(deltaPos.x) >= distance.x;
              bool enabledY = Mathf.Abs(deltaPos.y) >= distance.y;

              // Control both axis separately so the other one doesn't move small amounts.
              if (enabledX)
              {
                  playerPos.x = newPlayerPos.x;
                  cameraPos.x = Mathf.SmoothDamp(cameraPos.x, playerPos.x, ref velocity.x, smoothTime, maxSpeed);
                  // Clamp camera position so the player can't see out of bounds.
                  cameraPos.x = Mathf.Clamp(cameraPos.x, minBounds.x, maxBounds.x);
              }

              if (enabledY)
              {
                  playerPos.y = newPlayerPos.y;
                  cameraPos.y = Mathf.SmoothDamp(cameraPos.y, playerPos.y, ref velocity.y, smoothTime, maxSpeed);
                  // Clamp camera position so the player can't see out of bounds.
                  cameraPos.y = Mathf.Clamp(cameraPos.y, minBounds.y, maxBounds.y);
              }

              transform.position = cameraPos;
          }

          ...
      }
    `}
  </CodeBlock>
  <div className="md:max-w-2/3">
    ScrollCamera is a script that controls camera scrolling and smoothly follows the player.
    The script contains a deadzone separated by axis to keep the camera still when moving
    small distances. The script was created to allow the game to have larger levels without
    transitions between each room.
  </div>
  <div className="md:max-w-2/3">
    The script took a little bit of time to get right and there were various issues like the
    values in the velocity vector becoming NaN after a room transition which I fixed by setting
    the vector to Vector2.zero after transitions.
  </div>
</div>;
const roomEditor = <div className="*:my-8">
  <p className="md:max-w-2/3">
    Each room in the game is independent but I also needed a way to connect rooms together. What I previously did was
    assign an id to each exit in a room and used the id in room exits. The id system was really brittle and I often forgot
    to update exit ids and assign unique ids to new exits which led to many errors. This is why I chose to create a small
    custom room editor that can be used to connect two exits.
  </p>
  <p className="md:max-w-2/3">
    The room editor uses Unity&apos;s CustomEditor attribute to handle GUI events when a Room object is selected. The script uses
    HandleUtility.GUIPointToWorldRay to get the mouse&apos;s world position and detects whether an exit was clicked. When two exits
    are connected, they are marked as dirty and the changes are applied to the prefab instance in the script.
  </p>
  <ContentPicture
    path={asset("room_editor.png")}
    description="Room editor interface that can be used to connect rooms."
  />
  <p className="md:max-w-2/3">
    Alongside the editor, I added a mask to each room to cut off tiles and sprites that overflow the room bounds to improve the
    visual appearance of the rooms in the scene view.
  </p>
  <p className="md:max-w-2/3">
    All of the scripts use the UNITY_EDITOR directive to only compile them when the game is running in the editor because
    they&apos;re not necessary at runtime.
  </p>
</div>

const customShaderGraph = <div className="*:my-8">
  <p className="md:max-w-2/3">
      The game has swaying grass tiles, which I implemented by
      creating a script that changed the rotation of the tile.
      
      I wasn&apos;t entirely happy with the effect since it felt out of place for
      the grass to sway smoothly so I started looking into created a custom
      Shader Graphs to add a pixelation effect on the swaying grass.
  </p>
  <p className="md:max-w-2/3">
      Creating the shader was more difficult than I had anticipated. It was made harder by me
      not being able to find any examples of pixelation shader graphs that I could look at to
      see how its done.
  </p>
  <p className="md:max-w-2/3">
      The game uses spritesheets that contain multiple different tiles, which gave me trouble
      when creating the shader, because as it turns out, the shader graph uses the underlying
      texture regardless of what is assigned to the material. That meant that I had to add tiling
      and calculate the right offsets to the UV texture to sample only the correct tile.
  </p>
  <ContentPicture
    path={asset("grass_shader_isolate.png")}
    description="A part of the shader which uses two step nodes to isolate the correct tile."
  />
  <p className="md:max-w-2/3">
      The current implementation has an issue where a moving tile is clipped when it goes out of bounds.
      I haven&apos;t been able to fix it because increasing the bounds will cause other textures to be sampled
      alongside the grass tile.
  </p>
  <ContentPicture
    path={asset("grass_swaying.gif")}
    description="Swaying grass with the custom shader graph."
    additionalImageStyles="pixelated"
  />
</div>;
const playerAnimations = <div className="*:my-8">
  <p className="md:max-w-2/3">
      The issues I had with player animations were due to exit times and transition durations that
      the animator had. Because my animations are spritesheets, there is no way to transition between
      them which meant that having a transition duration just delayed the transition.
  </p>
  <ContentPicture
    path={asset("player_animator.png")}
    description="Player animation transitions."
  />
</div>;
const roomTransitions = <div className="*:my-8">
  <p className="md:max-w-2/3">
    In the game, I implemented room transitions as a trigger which loads the next room and moves the player
    to a position defined in the component. When going upwards, I added a force parameter that would be added
    during the transition to give the player enough momentum to land on a ledge in the next room.
  </p>
  <p className="md:max-w-2/3">
    When I was playtesting the game, I noticed that a lot of testers were moving to the opposite direction
    during a transition which caused them to counteract the force given and made them fall back into the last
    room. I solved the issue by freezing player controls for a small duration after a transition.
  </p>
  <CodeBlock>
    {`
      private void SwitchRoom()
      {
          Player player = GameManager.Instance.Player;

          // Disable player controls so they can't move during the transition.
          player.Controls.DisableForMillis(transitionDuration * 1000f);
          // Clear the current input frame.
          _ = player.Controls.RequestNextFrame();

          // Trigger sprite flip to the correct direction
          player.Move(dir.x + velocity.x, 0.0f);

          player.Rigidbody.linearVelocity = velocity;

          if (GameManager.Instance.CurrentRoom.Id != dstRoomId)
              GameManager.Instance.LoadRoom(dstRoomId);
          
          GameManager.Instance.CurrentRoom.GetRoomExit(dstRoomExitId).SwitchTo();
      }
    `}
  </CodeBlock>
</div>;
const colorBanding = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3">
    When I added post-processing effects and lights, I saw that the shading was very noticeable. I researched the issue and found
    that Unity has a dithering option on the camera which mitigates the issue by scrambling pixels on the edges.
    There are still smaller lines visible, but a lot less noticeable than without dithering.
  </div>
  <div className="flex flex-wrap gap-2 my-8">
    <ContentPicture
      path={asset("color_banding_before.png")}
      description="Color banding caused by vignette and lights."
      additionalImageStyles="pixelated"
    />
    <ContentPicture
      path={asset("color_banding_after.png")}
      description="Background with dithering enabled."
      additionalImageStyles="pixelated"
    />
  </div>
</div>

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
        { title: "Interfaces", content: interfaces },
        { title: "Custom RuleTile Script", content: customRuleTileScript },
        { title: "Camera Scrolling", content: cameraScrolling },
        { title: "Room Editor", content: roomEditor },
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
        { title: "Custom Shader Graph", content: customShaderGraph },
        { title: "Player Animations", content: playerAnimations },
        { title: "Room Transitions", content: roomTransitions },
        { title: "Color Banding", content: colorBanding },
      ]
    },
    {
      title: "Screenshots",
      ref: useRef(null),
      navButton: { title: "Screenshots" },
      content: <div className="
          grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 *:shadow-bg-black *:shadow-md w-fit
      ">
        <img src={asset("gameplay_screenshot0.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot1.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot2.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot3.png")} className="pixelated" />
        <p></p>
      </div>
    },
    {
      title: "Gameplay Video",
      ref: useRef(null),
      navButton: { title: "Gameplay" },
      content: <div>
        {/* Second iframe is needed so the video isn't blocked on Firefox for some reason */}
        <iframe hidden></iframe>
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/cAFu9xsRNwk" title="Fledge Gameplay" allowFullScreen></iframe>
      </div>
    }
  ];

  return (
    <ProjectPage
      title={TITLE}
      slug={SLUG}
      team={TEAM}
      description={DESCRIPTION}
      sections={sections}
      isMainPage={false}
    >
    </ProjectPage>
  );
}