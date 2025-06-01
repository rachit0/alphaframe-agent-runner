'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [tool, setTool] = useState('web-search');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (prompt.length > 500) {
      setError('Prompt must be 500 characters or less');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, tool }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to fetch result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt (e.g., '2+2' or 'What is AI?')"
        className="mb-4"
      />
      <Select value={tool} onValueChange={setTool} className="mb-4">
        <SelectTrigger>
          <SelectValue placeholder="Select a tool" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="web-search">Web Search</SelectItem>
          <SelectItem value="calculator">Calculator</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleRun} disabled={loading}>
        {loading ? 'Running...' : 'Run'}
      </Button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {result && <div className="mt-4 p-4 border rounded">{result}</div>}
    </div>
  );
}