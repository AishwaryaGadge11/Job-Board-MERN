'use client'
import { fetchLogs, runImport } from "@/lib/api";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const[logs,setLogs] =useState([]);
  const[loading,setLoading] =useState(false)
  const[refreshing,setRefreshing] =useState(false)

  const loadLogs=async()=>{
    setLoading(true);
    try {
      const data = await fetchLogs();
      setLogs(data)
    } catch (error) {
      console.log(error);
      
    }
    setLoading(false)
  }
  useEffect(()=>{loadLogs()},[])
  const handleImport=async()=>{
    setRefreshing(true);
    try {
      await runImport();
      alert("Import started ✅\nRefresh after a minute to see new log.")
    } catch (error) {
      alert("failed to start import")
    }
    setRefreshing(false)
  }
  return (
   <main className="min-h-screen bg-gray-900 p-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
      📊 Import History Dashboard
      </h1>
      <button onClick={handleImport}
      disabled={refreshing}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:bg-gray-700"
      >
        {refreshing ?"Running..." : "Run Import"}
      </button>
    </div>
{
  loading ?(
    <p>Loading logs...</p>
  ):(
    <div className="overflow-x-auto  rounded shadow">
        <table className="min-w-full border">
        <thead className="">
  <tr>
    <th className="p-2 border">Source</th>
    <th className="p-2 border">Total</th>
    <th className="p-2 border">New</th>
    <th className="p-2 border">Updated</th>
    <th className="p-2 border">Failed</th>
    <th className="p-2 border">Time</th>
  </tr>
</thead>
<tbody>
  {logs.map((log) => (
    <tr key={log._id} className="text-center">
      <td className="p-2 border">{log.sourceUrl}</td>
      <td className="p-2 border">{log.totalImported}</td>
      <td className="p-2 border text-green-600">{log.newJobs}</td>
      <td className="p-2 border text-blue-600">{log.updatedJobs}</td>
      <td className="p-2 border text-red-600">{log.failedJobs}</td>
      <td className="p-2 border">
        {new Date(log.createdAt).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

        </table>
    </div>
  )
}
   </main>
  );
}
