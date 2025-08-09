import fs from 'fs';
import path from 'path';
import showdown from 'showdown';
import MilestoneStyles from '@/components/MilestoneStyles';

export default function MilestonePage() {
  const filePath = path.join(process.cwd(), 'MILESTONE.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');

  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);

  return (
    <div className="font-sans bg-black text-white min-h-screen p-4 md:p-8">
      <MilestoneStyles />
      <div className="max-w-4xl mx-auto">
        <div className="milestone-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
