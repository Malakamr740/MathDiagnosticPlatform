import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import ChoicesEditor from '../components/ChoicesEditor'
import { ArrowLeft, Save } from 'lucide-react'

export const CreateQuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [domain, setDomain] = useState('Algebra & Functions')
  const [prompt, setPrompt] = useState('')
  const [choices, setChoices] = useState<any[]>([
    { id: 'c1', text: '', isCorrect: true },
    { id: 'c2', text: '', isCorrect: false },
    { id: 'c3', text: '', isCorrect: false },
    { id: 'c4', text: '', isCorrect: false },
  ])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/admin/questions')
  }

  return (
    <AdminLayout
      title="Create Diagnostic Question"
      subtitle="Define mathematical stem, LaTeX expressions, and answer options"
      actions={
        <button
          type="button"
          onClick={() => navigate('/admin/questions')}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      }
    >
      <form onSubmit={handleSave} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-xs font-semibold text-slate-700">Question Title / Summary</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Evaluating roots of quadratic equations..."
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Curriculum Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
            >
              <option>Algebra & Functions</option>
              <option>Geometry & Measurement</option>
              <option>Trigonometry</option>
              <option>Calculus & Limits</option>
              <option>Statistics & Probability</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700">Question Stem (Markdown / LaTeX)</label>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the mathematical problem stem. You can use standard notation..."
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Answer Choices</label>
          <ChoicesEditor choices={choices} onChange={setChoices} />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Question</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

export default CreateQuestionPage
