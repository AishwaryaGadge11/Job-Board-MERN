export const fetchLogs = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/logs`);
    if(!res.ok) throw new Error("failed to fetch logs");
    return res.json();
}

export const runImport =async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/import/run`)
    if(!res.ok) throw new Error("failed to start import")
        return res.json();
}