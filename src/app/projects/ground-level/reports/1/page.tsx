"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import CodeBlock from '@/components/CodeBlock';
import ContentPicture from '@/components/ContentPicture';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';

import ProjectBanner from '@/assets/ground-level/banner.png';
import ShowcaseImage0 from '@/assets/fledge/gameplay_screenshot0.png';
import ShowcaseImage1 from '@/assets/fledge/gameplay_screenshot1.png';
import ShowcaseImage2 from '@/assets/fledge/gameplay_screenshot2.png';
import ShowcaseImage3 from '@/assets/fledge/gameplay_screenshot3.png';
import Image from 'next/image';

const stateMachines = <div className="*:my-8">
  <div className="md:max-w-2/3 *:my-4">
    <p>
      For the enemies&apos; state machines, I wanted to create something modular and easily extendable. The approach I settled
      on was a finite state machine that chooses a state based on whether its conditions are met in order of priority.
      My game doesn't require very advanced AI so this is sufficient for my enemies.
    </p>
    <p>
      Implemention wise, since my focus was on modularity, the base code for states and state machines use generics
      so as little as possible is included in them. One exception I made was to include core components in the state machine
      so they can be accessed easily and don't need to be redefined everywhere.
    </p>
    <p>
      The enemy context aka the data associated with the enemy, consists of a single enum flags type. This means that
      all of the data it can contain are booleans. While this approach is pretty rigid, I didn&apos; want to opt for
      using a dictionary or something similar because I felt like that&apos; make things less clear and understandable.
      Another downside with the approach I went with is that since each enemy has their own context type, they also
      need to have their own state types, even if the states are exactly the same. To mitigate this, I created several
      wrapper types such as AnimationState and DeathState that can be extended easily but each enemy still needs to
      have their own classes.
    </p>
  </div>
  <div className="flex flex-row gap-4">
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

const s = <div className="*:my-8">
  <div className="max-w-2/3">

  </div>
</div>

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
        { title: "State Machines", content: stateMachines }
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
      ]
    },
    {
      title: "Screenshots",
      ref: useRef(null),
      navButton: { title: "Screenshots" },
      content: <div className="
          grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 *:shadow-bg-black *:shadow-md w-fit
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
      banner={ProjectBanner}
      sections={sections}
      isMainPage={false}
    >
    </ProjectPage>
  );
}