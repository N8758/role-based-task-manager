export default function ProjectCard({ project }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{project.name}</h3>
    </div>
  );
}