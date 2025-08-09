'use client'

const MilestoneStyles = () => (
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
);

export default MilestoneStyles;
