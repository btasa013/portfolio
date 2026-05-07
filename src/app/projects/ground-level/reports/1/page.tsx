"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import CodeBlock from '@/components/CodeBlock';
import ContentPicture from '@/components/ContentPicture';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';
import Image from 'next/image';

import ProjectBanner from '@/assets/ground-level/banner.png';

import ShowcaseImage0 from '@/assets/ground-level/image_001.png';
import ShowcaseImage1 from '@/assets/ground-level/image_002.png';
import ShowcaseImage2 from '@/assets/ground-level/image_003.png';
import ShowcaseImage3 from '@/assets/ground-level/image_004.png';

import DestructibleTerrain from '@/assets/ground-level/destructible_terrain.png';
import DestructibleTerrainColliders from '@/assets/ground-level/destructible_terrain_colliders.png';
import DifficultyCurve from '@/assets/ground-level/difficulty_curve.png';

const stateMachines = <div className="*:my-4">
  <div className="*:my-4">
    <p>
      For the enemy state machines, I wanted to create something modular and easily extendable. The approach I settled
      on was a finite state machine that chooses a state based on whether its conditions are met in order of priority.
      My game doesn&apos;t require very advanced AI so this is sufficient for my enemies.
    </p>
    <p>
      Implemention wise, since my focus was on modularity, the base code for states and state machines use generics
      so as little as possible is included in them. One exception I made was to include core components in the state machine
      so they can be accessed easily and don&apos;t need to be redefined everywhere.
    </p>
    <p>
      The enemy context aka the data associated with the enemy, consists of a single enum flags type. This means that
      all of the data it can contain are booleans. While this approach is pretty rigid, I didn&apos;t want to opt for
      using a dictionary or something similar because I felt like that&apos;d make things less clear and understandable.
      Another downside with the approach I went with is that since each enemy has their own context type, they also
      need to have their own state types, even if the states are exactly the same. To mitigate this, I created several
      wrapper types such as AnimationState and DeathState that can be extended easily but each enemy still needs to
      have their own classes.
    </p>
  </div>
  <div className="flex flex-col gap-4">
    <CodeBlock>
    {`
      public abstract class StateMachine<TContext> : MonoBehaviour
      where
          TContext : Enum
      {
          [field: Header("Components")]
          [field: SerializeField] public Transform RootTransform { get; private set; }
          [field: SerializeField] public Animator Animator { get; private set; }
          [field: SerializeField] public Rigidbody2D Rigidbody { get; private set; }
          [field: SerializeField] public Collider2D Collider { get; private set; }
          [field: SerializeField] public SpriteRenderer SpriteRenderer { get; private set; }

          [Header("States")]
          [SerializeField, Min(0.001f)] private float UpdateInterval = 0.5f;
          [SerializeField] private State<TContext> DefaultState;
          [SerializeField] private State<TContext>[] States;

          public Context<TContext> Context;
          public State<TContext> CurrentState;

          private void Start()
          {
              DefaultState.SetStateMachine(this);
              foreach (var state in States)
                  state.SetStateMachine(this);

              Invoke(nameof(UpdateState), UpdateInterval);
          }

          private void UpdateState()
          {
              var state = ChooseState();

              if (state != CurrentState)
              {
                  if (CurrentState != null)
                      CurrentState.Exit();

                  CurrentState = state;
                  if (state != null)
                      state.Enter();
              }

              Invoke(nameof(UpdateState), UpdateInterval);
          }

          // Go through all states and return the first that can be entered
          // except if the current state can't be exited.
          private State<TContext> ChooseState()
          {
              if (CurrentState != null)
              {
                  CurrentState.UpdateContext(ref Context);
                  if (!CurrentState.CanExit(ref Context))
                      return CurrentState;
              }

              foreach (var state in States)
              {
                  state.UpdateContext(ref Context);
                  if (state.CanEnter(ref Context))
                      return state;
              }

              return DefaultState;
          }

          ...
      }
    `}
    </CodeBlock>
    <CodeBlock>
      {`
        public abstract class State<TContext> : MonoBehaviour
        where
            TContext : Enum
        {
            [Header("Conditions")]
            [SerializeField] private TContext MustBeTrue;
            [SerializeField] private TContext MustBeFalse;

            protected StateMachine<TContext> StateMachine { get; private set; }

            public virtual bool CanExit(ref Context<TContext> context) => true;

            // Check that all 'mustBeTrue' conditions are met and none of the 'mustBeFalse' are.
            public virtual bool CanEnter(ref Context<TContext> context)
            {
                // The enum type can't be used directly so EnumHelper does it by converting it to an UInt64.
                return EnumHelper.HasAll(context.Flags, MustBeTrue) && EnumHelper.HasNone(context.Flags, MustBeFalse);
            }

            public virtual void UpdateContext(ref Context<TContext> context) { }

            public virtual void Enter() { }
            public virtual void Exit() { }

            public virtual void Tick() { }
            public virtual void FixedTick() { }

            ...
        }
      `}
    </CodeBlock>
  </div>
</div>;

const destructibleTerrain = <div className="*:my-4">
  <div>
    In the game, the bullets fired by the player and enemies explode, destroying the
    terrain. The destructible terrain was an important component of the game so it was
    one of the first things I implemented. When an explosion is spawned, Physics2D.SphereOverlap
    is used to find overlapping colliders. All destructible objects implement an IDestructible
    interface which handles the destruct behaviour.
  </div>
  <div>
    The function first creates clone of the sprite if one hasn&apos;t been created already,
    because otherwise the changes to the sprite would affect every tile with the same sprite.
    Then the explosion point is transformed into the sprite&apos;s texture space and each pixel
    inside of the explosion radius is iterated over. The script checks that the pixel is inside
    of the texture and skips transparent pixels. If the pixel is inside of the explosion radius,
    the color of it is either transparent or an edge color depending on the distance to the
    explosion&apos;s center point.
  </div>
  <CodeBlock>
    {`
      // Function that destroys a part of a sprite within a radius.
      public void DestructSphere(Vector2 point, float size)
      {
          // Return if renderer is disabled. This means that the whole tile is already fully destroyed.
          if (!_renderer.enabled)
              return;

          // Instantiate a copy of the sprite if one doesn't exist already.
          // This is so we can make changes to the sprite without affecting
          // other tiles with the same sprite.
          CopySpriteOnce();

          Sprite sprite = _renderer.sprite;
          Texture2D tex = sprite.texture;

          // Calculate the explosion position in pixels.
          Vector2 localPos = sprite.pixelsPerUnit * transform.InverseTransformPoint(point);
          Vector2 pos = localPos + sprite.rect.position + sprite.pivot;

          int posX = (int)pos.x;
          int posY = (int)pos.y;

          int width = tex.width;
          int height = tex.height;

          int radius = Mathf.RoundToInt(size * sprite.pixelsPerUnit);
          Color32[] pixels = tex.GetPixels32();

          // Precompute thresholds.
          float primaryEdgeThreshold = Mathf.Pow(radius - (PrimaryEdgeThickness + SecondaryEdgeThickness), 2);
          float secondaryEdgeThreshold = Mathf.Pow(radius - SecondaryEdgeThickness, 2);
          float radiusThreshold = radius * radius;

          // Iterate over all pixels in the radius.
          for (int x = -radius; x <= radius; x++)
          {
              for (int y = -radius; y <= radius; y++)
              {
                  int px = posX + x;
                  int py = posY + y;

                  // Not in range of the texture.
                  if (px < 0 || px >= width || py < 0 || py >= height)
                      continue;

                  int index = py * width + px;

                  // Skip empty pixels.
                  if (pixels[index].a == 0)
                      continue;

                  float sqrDist = x * x + y * y;

                  // Not in range of the explosion.
                  if (sqrDist > radiusThreshold)
                      continue;

                  // Choose color based on thresholds.
                  pixels[index] = sqrDist > secondaryEdgeThreshold
                      ? SecondaryEdgeColor
                      : sqrDist > primaryEdgeThreshold
                          ? PrimaryEdgeColor
                          : new Color32(0, 0, 0, 0);
              }
          }

          tex.SetPixels32(pixels);
          tex.Apply();

          // Rebuild polygon collider to match the sprite.
          // Uses the default CreateFromSprite function.
          if (_collider != null)
              _renderer.enabled = RebuildCollider();
      }
    `}
  </CodeBlock>
</div>;

const difficultyScaling = <div className="*:my-4">
  <div>
    Something I had a lot of trouble with was how to implement difficulty curve where
    each level would have more monsters. Initially, I also wanted a wave system that
    would spawn a bunch of monsters at once, but I decided to instead spawn monsters
    at a fixed interval and have a chance to spawn up to 3 at a time.
  </div>
  <div>
    I had no clue how to create a balanced difficulty curve (and I still don&apos;t)
    but I started with the square root because it would grow slower over time. I added
    some variance to it so it would feel more dynamic. The way the function worked, the first level
    would have had a chance to have a total of 5 monsters which is way too much. I ended up just
    adding a number of checks that limit the number of monsters based on the level number.
  </div>
  <div className="flex gap-4">
    <CodeBlock>
      {`
        // Function that calculates the total number of monsters on a level.
        private int CalculateTotalMonsters(float difficulty, int level)
        {
          // Initial number of monsters that scales with difficulty.
          int monsters = Mathf.RoundToInt(2 + Mathf.Sqrt(difficulty));
          monsters += Random.Range(-1, 3);

          // Minimum of one monster
          monsters = Mathf.Max(monsters, 1);

          // Maximum monsters depending on level.
          if (level == 1) monsters = 1;
          else if (level > 2) monsters = Mathf.Max(monsters, 2);
          else if (level > 4) monsters = Mathf.Max(monsters, 3);

          // Minimum monsters depending on level.
          if (level <= 3) monsters = Mathf.Min(monsters, 2);
          else if (level <= 4) monsters = Mathf.Min(monsters, 3);
          else if (level <= 5) monsters = Mathf.Min(monsters, 4);
          else if (level <= 8) monsters = Mathf.Min(monsters, 5);

          return monsters;
        }
      `}
    </CodeBlock>
    <ContentPicture path={DifficultyCurve} description="
      The difficulty curve where the level is on the x-axis and monsters on the y-axis. (Geogebra)
    "></ContentPicture>
  </div>
</div>;

const terrain = <div className="*:my-4">
  <div>
    Another issue I had when developing the game was the movement on the terrain. Because the player and monsters can destroy the
    ground, the terrain can be pretty much any shape, which the player should be able to traverse without getting stuck.
  </div>
  <div>
    The terrain uses polygon colliders on each tile which are regenerated when the sprite changes. The generated colliders are not
    as precise as the sprites but that has the advantage of smoothing out the terrain which makes movement better. The movement is
    handled by Unity&apos;s physics engine so writing custom movement logic is not needed. One issue with this was that early on,
    I made the terrain&apos;s physics material have maximum friction to avoid sliding but that caused the player to get stuck on
    small bumps. After setting the friction to zero and handling sliding in the player&apos;s movement script, the movement became
    much more smooth.
  </div>
  <div className="flex gap-8">
    <ContentPicture
      path={DestructibleTerrain}
      description="A part of destroyed terrain."
    />
    <ContentPicture
      path={DestructibleTerrainColliders}
      description="Destroyed terrain with collider outlines."
    />
  </div>
</div>;

const timeConstraints = <div className="*:my-4">
  <div>
    I started this project in April, a few weeks before the end of the semester & the DemoDay event. I wanted to showcase this
    project during the event which meant that I only had a few weeks to develop a playable demo. That accompanied with other
    courses and their assignments meant that I had to prioritize parts of the game that were crucial.
  </div>
  <div>
    One of the features I dropped from the demo were player abilities. I probably would&apos;ve had the time to develop a couple different
    abilities for the player, but instead I decided to focus on adding more monsters. If I went with abilities instead, the demo would&apos;ve only had
    two or three different monsters.
  </div>
  <div>
    Despite the time constraints, the demo ended up being playable mostly free of bugs. I was the least happy with the movement that
    felt a little too floaty but other than that, all of the main functionalities worked without issue.
  </div>
</div>;

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
        { title: "Destructible Terrain", content: destructibleTerrain },
        { title: "State Machines", content: stateMachines }
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
        { title: "Difficulty Scaling", content: difficultyScaling },
        { title: "Terrain & Movement", content: terrain },
        { title: "Time Constraints", content: timeConstraints }
      ]
    },
    {
      title: "Screenshots",
      ref: useRef(null),
      navButton: { title: "Screenshots" },
      content: <div className="
          *:shadow-bg-black *:shadow-md max-w-5/6
          grid grid-cols-1 grid-rows-4 gap-4
          md:grid-cols-2 md:grid-rows-2
      ">
        <Image alt="" src={ShowcaseImage0} className="pixelated"/>
        <Image alt="" src={ShowcaseImage1} className="pixelated"/>
        <Image alt="" src={ShowcaseImage2} className="pixelated"/>
        <Image alt="" src={ShowcaseImage3} className="pixelated"/>
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
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/kStJTdOw_M8" title="Ground Level Gameplay" allowFullScreen></iframe>
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