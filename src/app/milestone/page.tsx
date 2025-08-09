import fs from 'fs';
import path from 'path';
import showdown from 'showdown';

export default function MilestonePage() {
  const filePath = path.join(process.cwd(), 'MILESTONE.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');

  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);

  return (
    <div className="font-sans bg-black text-white min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <style jsx global>{`
          .milestone-content h1 {
            font-size: 2.25rem;
            font-weight: bold;
            color: #2dd4bf; /* text-cyan-400 */
            margin-bottom: 1rem;
          }
          .milestone-content h3 {
            font-size: 1.5rem;
            font-weight: bold;
            color: #34d399; /* text-green-400 */
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid #4b5563; /* border-gray-600 */
            padding-bottom: 0.5rem;
          }
          .milestone-content ul {
            list-style-type: none;
            padding-left: 0;
          }
          .milestone-content li {
            background-color: #1f2937; /* bg-gray-800 */
            border: 1px solid #4b5563; /* border-gray-700 */
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .milestone-content p {
            margin-top: 0.5rem;
            color: #d1d5db; /* text-gray-300 */
          }
        `}</style>
        <div className="milestone-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
