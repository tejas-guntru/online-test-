import ModuleCard from "./ModuleCard";

const ModuleGrid = () => {
  // Temporary mock data
  const modules = [
    { id: 1, title: "HTTP Basics", status: "Draft" },
    { id: 2, title: "System Design Intro", status: "Published" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modules.map((m) => (
        <ModuleCard key={m.id} module={m} />
      ))}
    </div>
  );
};

export default ModuleGrid;
