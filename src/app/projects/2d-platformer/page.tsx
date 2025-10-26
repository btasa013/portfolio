import Page from '@/components/Page';
import { getPath } from '@/scripts/path';

export default function Project() {
  return (
    <Page>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">

        <div className="relative overflow-hidden bg-black">
          <img className="w-full" src={getPath("assets/2d-platformer/banner.png")}/>
        </div>

        <Section id="Description" title="2D Platformer">
          <div className="*:my-8">
            <p>
              [2D Platformer] is a 2D platformer and adventure game created in Unity.
            </p>

            <p className="w-2/3">
              The game is inspired by Celeste and focuses on fast-paced platforming where
              the player has to traverse each room by jumping, gliding or climbing over obstacles.
              Hidden across the levels, the player can find collectibles which serve as a bonus objective.
            </p>

            <p className="w-2/3">
              The game follows an owl fledgling who left the nest too early in search of adventure.
              As the player progresses, the owl will learn skills such as to gliding, flapping its wings,
              and eventually, taking flight.
            </p>
          </div>
        </Section>
        <Section id="0" title="0">
          <div>
          </div>
        </Section>
        <Section id="1" title="1">
          <div className="flex flex-wrap gap-8 my-16">
          </div>
        </Section>
        <Section id="2" title="2">
          <div className="flex flex-col py-8 mb-96">
          </div>
        </Section>
      </div>
    </Page>
  );
}

interface SectionProps {
  id: string;
  title: string;
  ref?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
}

function Section({ id, title, ref, children }: SectionProps) {
  return (
    <section id={id} ref={ref} className="scroll-my-64 p-8 font-inter shadow-xs shadow-black">
      <h1 className="font-semibold text-2xl font-mplus mb-8">{title}</h1>
      {children}
    </section>
  )
}