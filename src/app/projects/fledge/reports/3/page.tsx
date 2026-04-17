"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';
import Image from 'next/image';
import ContentPicture from '@/components/ContentPicture';

import ShowcaseImage0 from '@/assets/fledge/image0.png';
import ShowcaseImage1 from '@/assets/fledge/image1.png';
import ShowcaseImage2 from '@/assets/fledge/image2.png';
import ShowcaseImage3 from '@/assets/fledge/image3.png';

import ProjectBanner from '@/assets/fledge/banner.png';

import PlayerOnEdgePicture from '@/assets/fledge/player_onedge.png';
import PlayerCollidersPicture from '@/assets/fledge/player_colliders.png';
import MisalignedBackgrounds from '@/assets/fledge/misaligned_backgrounds.png';
import CodeBlock from '@/components/CodeBlock';

const playerMovement = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 xl:max-w-3/5 flex flex-col gap-4">
    <div>
      The player character uses a finite state machine with states such as Idle, Walk and Climb. Each of the states
      used to have their own update loop where the player movement was applied. The change I made was to create
      a single PlayerMovement script that handles moving and jumping. The change increases the readability and
      understability of the state machine code.
    </div>
    <div>
      Having a single movement script also allowed me to add more features to the movement system such as
      coyote and buffer time for jumps, reduced gravity at the apex (peak height of a jump) as well as being
      able to tune the movement settings better.
    </div>
  </div>
  <CodeBlock>
    {`
      public class PlayerMovement : MonoBehaviour
      {
        private void FixedUpdate()
        {
          // Handle gravity logic manually to allow
          // for better tuning of falling and jumps.
        }

        // Called every frame with input data.
        public void OnFrameUpdate(PlayerStateData data)
        {
          // Used to update counters and internal variables.
        }

        // Called by player states every frame with their own speed.
        public void MoveWithSpeed(float input, float speed)
        {
          // Smooth movement acceleration and deceleration.
        }

        // Called by a player state when the player tries to jump.
        // Checks if jumping is allowed and does nothing if it isn't.
        public void TryJump(PlayerStateData data)
        {
          // There are three kinds of jumps: regular, wall & charged wall.
          // One is chosen based on the state and its jump logic is executed.
        }
      }
    `}
  </CodeBlock>
</div>;

const transitionManager = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 xl:max-w-3/5 *:my-4">
    <div>
      TransitionManager is a script that handles transitions between rooms. When a room is entered or the
      player dies, the Transition function is called which will load the new room and perform the provided
      transition coroutine.
    </div>
    <div>
      The transitions are used to make the player character walk to the next room when
      the entrance is horizontal and to launch the player up and onto a platform when the entrance is vertical
      and the player is going up.
    </div>
  </div>
  <CodeBlock>
    {`
      public class TransitionManager : MonoBehaviour
      {
        // Another script that handles the actual loading and unloading of the rooms.
        private RoomLoader roomLoader;

        // Start the transition to another room.
        public void Transition(int roomId, int srcTrig, int dstTrig, Func<IEnumerator> transition = null)
        {
            lastRoom = roomLoader.CurrentRoom;
            player.Controls.Disable();

            // Add a callback to execute when the room has loaded.
            roomLoader.AddCallback(room => RoomLoaded(room, transition));

            // Loads the destination room. The source and destination triggers
            // are used to align the loaded room correctly with the last room.
            roomLoader.LoadRoom(roomId, srcTrig, dstTrig);
        }

        private void RoomLoaded(Room nextRoom, Func<IEnumerator> transition)
        {
          // Mark the last room for unloading. This sets a flag which is
          // checked before the room is unloaded to make sure that if the
          // room was entered again, the room stays loaded.
          if (nextRoom != lastRoom && lastRoom != null)
            roomLoader.MarkWillUnload(lastRoom.Id);

          StartCoroutine(TransitionCoroutine(nextRoom, lastRoom, transition));
        }

        private IEnumerator TransitionCoroutine(Room nextRoom, Room lastRoom, Func<IEnumerator> transition)
        {
          float t = Time.time;

          // Run the transition logic.
          yield return transition?.Invoke();

          player.Controls.Enable();

          if (nextRoom != lastRoom && lastRoom != null)
          {
            // Start unloading the room.
            float delay = roomUnloadTime - (Time.time - t);
            yield return UnloadRoom(lastRoom.Id, delay);
          }
        }
      }
    `}
  </CodeBlock>
</div>;

const effectManager = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 xl:max-w-3/5 *:my-4">
    <div>
      EffectManager is a singleton component used to control the particle systems in the game.
      Most particle systems in the game are located in the main scene and activated by script
      when needed. During a transition to another room or after respawning, some effects may still be
      active, which is why I created the EffectManager to be able to control the effects globally.
      When the player dies or goes into a new room, the particle systems are stopped and cleared so they
      don't stay visible in the next room.
    </div>
  </div>
  <CodeBlock>
    {`
      public class EffectManager : MonoSingleton<EffectManager>
      {
        private ParticleSystem[] effects;

        // Stop and clear every global particle effect.
        // Particle effects inside rooms aren't affected.
        public void ClearAllParticles()
        {
          if (Instance == null)
            return;

          // Initialize the effects array with all
          // particle systems found in the scene.
          Instance.effects ??= FindObjectsByType<ParticleSystem>(
            FindObjectsInactive.Include,
            FindObjectsSortMode.None
          );

          // Stop and clear all particles.
          foreach (ParticleSystem effect in effects)
          {
            effect.Stop();
            effect.Clear();
          }
        }
      }
    `}
  </CodeBlock>
</div>;

const oneWayPlatforms = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 xl:max-w-3/5 *:my-4">
    <div>
      Unity has its own PlatformEffector2D component that can be used for one-way platforms.
      Unfortunately using the component keeps the sides of the platform collidable so I had
      to create my own one-way platform implementation. The script uses a raycast to determine
      whether a platform is underneath the player, and checks its position against the player&apos;s
      feet to see whether the collision should be ignored.
    </div>
  </div>
  <CodeBlock>
    {`
      [RequireComponent(typeof(TilemapCollider2D), typeof(CompositeCollider2D))]
      public class OneWayPlatform : MonoBehaviour
      {
        [SerializeField] private LayerMask platformLayer;

        private Player player;
        private new TilemapCollider2D collider;
        private CompositeCollider2D composite;

        private void Start()
        {
          player = GameManager.Instance.Player;
          collider = GetComponent<TilemapCollider2D>();
          composite = GetComponent<CompositeCollider2D>();
        }

        private void FixedUpdate()
        {
          bool ignore = ShouldIgnoreCollisions();

          // Ignore both the tilemap and composite collisions.
          Physics2D.IgnoreCollision(player.Collider, collider, ignore);
          Physics2D.IgnoreCollision(player.Collider, composite, ignore);
        }

        private bool ShouldIgnoreCollisions()
        {
          // Ignore collisions if the player is moving upwards.
          if (player.Rigidbody.linearVelocity.y > 0f)
            return true;

          RaycastHit2D hit = Physics2D.BoxCast(
            player.Collider.bounds.center,
            player.Collider.bounds.size,
            0f,
            Vector2.down,
            1f,
            platformLayer
          );

          // Ignore collisions if there are no platforms underneath the player.
          if (!hit)
            return true;

          float feetY = player.Collider.bounds.min.y;
          return feetY < hit.point.y - 0.01f;
        }
      }
    `}
  </CodeBlock>
</div>;

const playerCollision = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 flex flex-col gap-4">
    <div>
      This problem relates to the player being able to stand on edges of platforms even when their feet are not touching it.
      In the game, this also allows the player to stand right on the edge of a spike without being killed.
    </div>
    <div>
      My first solution was to shrink the collider to make the problem less noticeable but this meant that most
      of the player sprite could go inside of a tile. Another solution I tried was using a polygon collider that
      would be full-sized at the top and smaller at the bottom which had the added benefit of sliding the player
      down when their feet are off the ground. This worked for the most part, but the game contains sections with
      one tile gaps that the player must fit through, and using a full-sized collider means that the player can't
      fit through.
    </div>
    <div>
      I ended up using an approach with two colliders, a normal and slim. The normal collider is active most of the
      time. The slim collider is activated when the player is walking or falling.

      I also separated the hitbox and collider so the player&apos;s sprite cannot clip into a spike or
      other deadly object.
    </div>
  </div>
  <div className="flex flex-wrap gap-2 my-8">
    <ContentPicture
      path={PlayerOnEdgePicture}
      description="The player standing on the edge of a tile."
    />
    <ContentPicture
      path={PlayerCollidersPicture}
      description="Normal collider (left) and slim collider (right)."
    />
  </div>
</div>;

const roomTransitions = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 flex flex-col gap-4">
    <div>
      The rooms in the game are implemented as additive scenes that are loaded when the room is
      entered and unloaded when exited. Each entrance to a room has a connection point which is
      an empty transform so the rooms can be connected correctly.
    </div>
    <div>
      This system allows the game to not have all of the rooms loaded at the same time and has no need
      to manually offset each room. There were a few problems I encountered when developing it
      that I will mention:
    </div>
    <div className="mx-4 flex flex-col gap-2">
      <li className="font-medium">Room Offsets</li>
      <div>
        The first issue that I found was that even though the loaded room is offset correctly to the
        connection point of the entrance, rooms&apos; positions were still wrong by a couple of units.
        After debugging the problem for a while, I figured out that the room was set to static, and when
        it was moved after being loaded, something broke causing the room to not be in the right location.
      </div>
      <div>
        A similar issue affected the colliders in the room which is why I had to force the colliders to be
        recomputed by turning them off and on.
      </div>
    </div>
    <div className="mx-4 flex flex-col gap-2">
      <li className="font-medium">Room loading and unloading</li>
      <div>
        Each room is loaded when entered and unloaded when exited. Because the room positions are not stored
        anywhere, there was an issue when the player died and their checkpoint was in another room because there
        wasn&apos;t an easy way to know what position the room should be at. The way I solved the issue was to add
        a room offset dictionary to the room loader script, which stores the offset of visited rooms so they
        can be loaded at the same position.
      </div>
    </div>
    <div className="mx-4 flex flex-col gap-2">
      <li className="font-medium">Background Aligment</li>
      <div>
        The third issue is something that I still haven't been able to solve. Each room has it&apos;s own
        background image that uses a script to move it relative to the player for a parallax effect.
        The problem comes in when the player transitions from two rooms tbat bave tbe same background.
        Ideally, the two backgrounds should line up, but the parallax code makes it difficult to determine
        the correct offset.
      </div>
      <div>
        I decided to not focus on this right now, since it&apos;s only visible
        for a couple of seconds and is not very noticeable when the camera is moving.
      </div>
    </div>
  </div>
  <div className="flex flex-wrap gap-2 my-8">
    <ContentPicture
      path={MisalignedBackgrounds}
      description="The backgrounds are slightly misaligned. This is harder to notice when the camera is moving and there are tiles in the way."
    />
  </div>
</div>;

const wallJumping = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3 flex flex-col gap-4">
    <div>
      In the game, the player can hold onto a wall and slide down by holding down the movement button
      of the direction to the wall. When wall jumping, this creates an issue where the player has to
      quickly switch their direction after jumping to preserve the horizontal velocity given by the
      wall jump. During playtesting, I noticed several people getting stuck on this and not being
      able to switch their inputs in time.
    </div>
    <div className="*:my-2">
      The solution that I landed on was two-fold:
      <div>
        1) Disable the opposite movement direction for a small amount of time to give
        the player enough time to switch directions.
      </div>
      <div>
        2) Add a coroutine that sets the horizontal velocity again in case something
        negated the velocity and the player is still moving in the same direction as
        the wall jump.
      </div>
    </div>
    <CodeBlock>
      {`
        IEnumerator SetVelocityX()
        {
          yield return new WaitForSeconds(0.1f);
          float movementDir = Mathf.Sign(currentFrame.frame.MovementInput);
          bool movementMatchesDir = movementDir == Mathf.Sign(direction);
          if (currentFrame.frame.MovementInput != 0 && movementMatchesDir)
            rb.linearVelocityX = direction * dirForce;
        }

        rb.linearVelocityX = direction * dirForce;

        // Set velocity again in case it was negated by something.
        StartCoroutine(SetVelocityX());

        // Disable player controls for the opposite direction
        player.Controls.DisableDirectionForSeconds(-direction, disableControlsForSecs);
      `}
    </CodeBlock>
    <div>
      The second solution is a bit of a hack since it&apos;d be better to stop the
      velocity from being negated after a wall jump in the first place, but figuring
      out where this was happening was a challenge and my best guess is that after
      wall jumping, if the player doesn't give any movement input, they decelerate to
      zero quickly. Nontheless, this solution works so I kept it.
    </div>
  </div>
</div>;

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
        { title: "Improved Player Movement", content: playerMovement },
        { title: "Transition Manager", content: transitionManager },
        { title: "Effect Manager", content: effectManager },
        { title: "One-Way Platforms", content: oneWayPlatforms }
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
        { title: "Player Collision", content: playerCollision },
        { title: "Room Transitions", content: roomTransitions },
        { title: "Wall Jumping", content: wallJumping }
      ]
    },
    {
      title: "Screenshots",
      ref: useRef(null),
      navButton: { title: "Screenshots" },
      content: <div className="
        grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 *:shadow-bg-black *:shadow-md w-fit
      ">
        <Image alt="" src={ShowcaseImage0}/>
        <Image alt="" src={ShowcaseImage1}/>
        <Image alt="" src={ShowcaseImage2}/>
        <Image alt="" src={ShowcaseImage3}/>
        <p></p>
      </div>
    },
    {
      title: "Gameplay Video",
      ref: useRef(null),
      navButton: { title: "Gameplay" },
      content: <div>
        { /* Second iframe is needed so the video isn't blocked on Firefox for some reason */ }
        <iframe hidden></iframe>
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/uErqjzIrJPs" title="Fledge Gameplay" allowFullScreen></iframe>
      </div>
    }
  ];

  return (
    <ProjectPage
      title={TITLE}
      slug={SLUG}
      team={TEAM}
      description={DESCRIPTION}
      banner={ProjectBanner}
      sections={sections}
      isMainPage={false}
    >
    </ProjectPage>
  );
}