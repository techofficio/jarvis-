import { UIBlock } from '../lib/schema';
import Heading from './blocks/Heading';
import Note from './blocks/Note';
import BarChart from './blocks/BarChart';
import ImageBlock from './blocks/Image';

export default function Renderer({ blocks }: { blocks: UIBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'heading':
            return <Heading key={i} {...block} />;
          case 'note':
            return <Note key={i} {...block} />;
          case 'bar_chart':
            return <BarChart key={i} {...block} />;
          case 'image':
            return <ImageBlock key={i} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
