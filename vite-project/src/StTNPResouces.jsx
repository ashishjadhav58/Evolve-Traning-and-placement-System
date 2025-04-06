import React, { useEffect, useState } from 'react';

export default function StTNPResouces() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("https://evolve-6rfd.onrender.com/api/resouces");
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter((res) =>
    res.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ResourceCard = ({ res }) => (
    <div className="card m-2 p-3 shadow" style={{ width: "250px" }}>
      <h5>{res.resourceName}</h5>
      <p><strong>Category:</strong> {res.category}</p>
      <p><strong>Uploaded by:</strong> {res.uploadedBy}</p>
      <p><strong>Date:</strong> {new Date(res.uploadDate).toDateString()}</p>
      <a href={res.driveLink} target="_blank" rel="noopener noreferrer">View Resource</a>
    </div>
  );

  return (
    <div className="container text-center">
      <h4 className="mt-4">Learning Resources</h4>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Resource Cards */}
      <div className="d-flex flex-wrap justify-content-center">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => <ResourceCard key={res._id} res={res} />)
        ) : (
          <p>No matching resources found.</p>
        )}
      </div>
    </div>
  );
}
