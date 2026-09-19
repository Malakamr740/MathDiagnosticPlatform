import React, { useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import TaxonomyTree, { type TaxonomyNode } from '../components/Reports/TaxonomyTree'
import { Plus, FolderTree } from 'lucide-react'

export const TaxonomyPage: React.FC = () => {
  const [taxonomyData] = useState<TaxonomyNode[]>([
    {
      id: 'alg',
      name: 'Algebra & Functions',
      code: 'ALG',
      question_count: 85,
      children: [
        {
          id: 'alg-linear',
          name: 'Linear Equations & Inequalities',
          code: 'ALG.1',
          question_count: 32,
        },
        {
          id: 'alg-quad',
          name: 'Quadratic & Higher Order Polynomials',
          code: 'ALG.2',
          question_count: 28,
        },
        {
          id: 'alg-exp',
          name: 'Exponential & Logarithmic Functions',
          code: 'ALG.3',
          question_count: 25,
        },
      ],
    },
    {
      id: 'geom',
      name: 'Geometry & Measurement',
      code: 'GEO',
      question_count: 64,
      children: [
        {
          id: 'geom-proofs',
          name: 'Congruence, Similarity & Geometric Proofs',
          code: 'GEO.1',
          question_count: 30,
        },
        {
          id: 'geom-analytic',
          name: 'Coordinate Geometry & Conic Sections',
          code: 'GEO.2',
          question_count: 34,
        },
      ],
    },
    {
      id: 'calc',
      name: 'Calculus & Analysis',
      code: 'CALC',
      question_count: 48,
      children: [
        {
          id: 'calc-deriv',
          name: 'Derivatives & Applications of Differentiation',
          code: 'CALC.1',
          question_count: 28,
        },
        {
          id: 'calc-int',
          name: 'Definite Integrals & Fundamental Theorem',
          code: 'CALC.2',
          question_count: 20,
        },
      ],
    },
  ])

  const [selectedNode, setSelectedNode] = useState<TaxonomyNode | null>(null)

  return (
    <AdminLayout
      title="Curriculum Taxonomy Management"
      subtitle="Hierarchical domain structure, objective nodes, and question distributions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Taxonomy Hierarchy
              </h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Root Domain</span>
            </button>
          </div>

          <TaxonomyTree
            data={taxonomyData}
            selectedId={selectedNode?.id}
            onSelectNode={(node) => setSelectedNode(node)}
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Node Details
          </h3>
          {selectedNode ? (
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Name</span>
                <p className="text-sm font-semibold text-slate-900">{selectedNode.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Code</span>
                <p className="text-xs font-mono text-slate-600">{selectedNode.code || 'None'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Questions</span>
                <p className="text-xs font-medium text-slate-600">
                  {selectedNode.question_count || 0} items mapped
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">Select a taxonomy node to inspect its properties</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default TaxonomyPage
