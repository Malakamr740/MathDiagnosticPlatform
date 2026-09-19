import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { Plus, Search, HelpCircle, Edit3, Trash2 } from 'lucide-react'

export const QuestionBankPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const demoQuestions = [
    {
      id: 'q1',
      title: 'Polynomial Division and Remainder Theorem',
      domain: 'Algebra & Functions',
      difficulty: 'Medium',
      type: 'Multiple Choice',
    },
    {
      id: 'q2',
      title: 'Trigonometric Identities with Double Angles',
      domain: 'Trigonometry',
      difficulty: 'Hard',
      type: 'Multiple Choice',
    },
    {
      id: 'q3',
      title: 'Instantaneous Rate of Change via Derivatives',
      domain: 'Calculus',
      difficulty: 'Hard',
      type: 'Multiple Choice',
    },
    {
      id: 'q4',
      title: 'Conditional Probability in Two-Way Frequency Tables',
      domain: 'Statistics & Probability',
      difficulty: 'Easy',
      type: 'Multiple Choice',
    },
  ]

  const filtered = demoQuestions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout
      title="Question Bank"
      subtitle="Catalog of taxonomy-aligned mathematics diagnostic questions"
      actions={
        <Link
          to="/admin/questions/new"
          style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Question</span>
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions by topic, domain, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-xs text-slate-800 focus:outline-hidden"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">{q.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-500 font-medium">{q.domain}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/questions/${q.id}/edit`}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white transition"
                  title="Edit question"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition"
                  title="Delete question"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default QuestionBankPage
