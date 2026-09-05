import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  PlusCircle, 
  FileText, 
  Activity, 
  Droplet, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

// URL do Backend hospedado no Render
const API_URL = 'https://backend-sitio.onrender.com';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Estados dos Formulários
  const [financeiro, setFinanceiro] = useState({ tipo: 'Despesa', categoria: 'Insumos', valor: '', descricao: '', data: new Date().toISOString().split('T')[0] });
  const [atividade, setAtividade] = useState({ setor: 'Geral', descricao: '', responsavel: '', data: new Date().toISOString().split('T')[0] });
  const [leite, setLeite] = useState({ quantidade_litros: '', vaca_id: '', observacao: '', data: new Date().toISOString().split('T')[0] });
  const [sanidade, setSanidade] = useState({ animal_id: '', tipo_evento: 'Vacina', produto_utilizado: '', dosagem: '', proxima_aplicacao: '' });

  // Exibir mensagem temporária de retorno
  const showMessage = (msg, isError = false) => {
    setStatusMessage({ text: msg, isError });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Envio genérico para a API
  const handleSubmit = async (endpoint, data, resetForm, resetState) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showMessage('Registro salvo com sucesso!');
        resetForm(resetState);
      } else {
        const errorData = await response.json();
        showMessage(errorData.detail || 'Erro ao salvar registro.', true);
      }
    } catch (err) {
      showMessage('Erro de conexão com o servidor.', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-12">
      {/* Cabeçalho */}
      <header className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Tractor className="w-6 h-6" />
            Gestão do Sítio
          </h1>
          <span className="text-xs bg-emerald-800 px-2.5 py-1 rounded-full border border-emerald-600 font-medium">
            SiGeS v1.0
          </span>
        </div>
      </header>

      {/* Alerta de Notificação */}
      {statusMessage && (
        <div className={`p-3 text-center text-sm font-medium text-white transition-all ${statusMessage.isError ? 'bg-red-600' : 'bg-emerald-600'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            {statusMessage.isError ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {statusMessage.text}
          </div>
        </div>
      )}

      {/* Navegação por Abas */}
      <nav className="bg-white border-b border-slate-200 sticky top-[60px] z-40 shadow-sm overflow-x-auto">
        <div className="max-w-4xl mx-auto flex justify-between min-w-[360px]">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex-1 py-3 px-2 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Activity className="w-4 h-4" />
            Painel
          </button>

          <button 
            onClick={() => setActiveTab('financeiro')} 
            className={`flex-1 py-3 px-2 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === 'financeiro' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <DollarSign className="w-4 h-4" />
            Financeiro
          </button>

          <button 
            onClick={() => setActiveTab('atividades')} 
            className={`flex-1 py-3 px-2 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === 'atividades' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <FileText className="w-4 h-4" />
            Atividades
          </button>

          <button 
            onClick={() => setActiveTab('leite')} 
            className={`flex-1 py-3 px-2 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === 'leite' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Droplet className="w-4 h-4" />
            Leite
          </button>

          <button 
            onClick={() => setActiveTab('sanidade')} 
            className={`flex-1 py-3 px-2 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === 'sanidade' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldAlert className="w-4 h-4" />
            Sanidade
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* ABA: PAINEL / DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-700">Resumo da Propriedade</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                  <TrendingUp className="w-4 h-4" /> Receitas
                </div>
                <p className="text-xl font-bold text-slate-800">R$ --,--</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-red-600 text-xs font-semibold mb-1">
                  <TrendingDown className="w-4 h-4" /> Despesas
                </div>
                <p className="text-xl font-bold text-slate-800">R$ --,--</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-sm font-semibold text-slate-700">Acesso Rápido</h3>
              <p className="text-xs text-slate-500">Selecione uma das abas acima para registrar movimentações do dia a dia da fazenda.</p>
            </div>
          </div>
        )}

        {/* ABA: FINANCEIRO */}
        {activeTab === 'financeiro' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              Lançamento Financeiro
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('financeiro', { ...financeiro, valor: parseFloat(financeiro.valor) }, setFinanceiro, { tipo: 'Despesa', categoria: 'Insumos', valor: '', descricao: '', data: new Date().toISOString().split('T')[0] });
            }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Tipo</label>
                  <select 
                    value={financeiro.tipo} 
                    onChange={(e) => setFinanceiro({ ...financeiro, tipo: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Valor (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={financeiro.valor} 
                    onChange={(e) => setFinanceiro({ ...financeiro, valor: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Categoria</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Ração, Combustível, Venda de Leite"
                  value={financeiro.categoria} 
                  onChange={(e) => setFinanceiro({ ...financeiro, categoria: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Descrição</label>
                <input 
                  type="text" 
                  placeholder="Observações adicionais..."
                  value={financeiro.descricao} 
                  onChange={(e) => setFinanceiro({ ...financeiro, descricao: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Data</label>
                <input 
                  type="date" 
                  required
                  value={financeiro.data} 
                  onChange={(e) => setFinanceiro({ ...financeiro, data: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Salvar Registro Financeiro'}
              </button>
            </form>
          </div>
        )}

        {/* ABA: ATIVIDADES */}
        {activeTab === 'atividades' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              Registro de Atividades
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('atividades', atividade, setAtividade, { setor: 'Geral', descricao: '', responsavel: '', data: new Date().toISOString().split('T')[0] });
            }} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Setor</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Pastagem, Cerca, Máquinas"
                  value={atividade.setor} 
                  onChange={(e) => setAtividade({ ...atividade, setor: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Descrição da Atividade</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Detalhamento do trabalho realizado..."
                  value={atividade.descricao} 
                  onChange={(e) => setAtividade({ ...atividade, descricao: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Responsável</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nome do operador"
                    value={atividade.responsavel} 
                    onChange={(e) => setAtividade({ ...atividade, responsavel: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Data</label>
                  <input 
                    type="date" 
                    required
                    value={atividade.data} 
                    onChange={(e) => setAtividade({ ...atividade, data: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Salvar Atividade'}
              </button>
            </form>
          </div>
        )}

        {/* ABA: LEITE */}
        {activeTab === 'leite' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              Controle de Produção de Leite
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('producao-leite', { ...leite, quantidade_litros: parseFloat(leite.quantidade_litros) }, setLeite, { quantidade_litros: '', vaca_id: '', observacao: '', data: new Date().toISOString().split('T')[0] });
            }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Volume (Litros)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    placeholder="0.0"
                    value={leite.quantidade_litros} 
                    onChange={(e) => setLeite({ ...leite, quantidade_litros: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ID / Nome da Vaca</label>
                  <input 
                    type="text" 
                    placeholder="Opcional (ex: Mimosa)"
                    value={leite.vaca_id} 
                    onChange={(e) => setLeite({ ...leite, vaca_id: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Observações</label>
                <input 
                  type="text" 
                  placeholder="Ordenha da manhã/tarde, etc..."
                  value={leite.observacao} 
                  onChange={(e) => setLeite({ ...leite, observacao: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Data</label>
                <input 
                  type="date" 
                  required
                  value={leite.data} 
                  onChange={(e) => setLeite({ ...leite, data: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Salvar Produção'}
              </button>
            </form>
          </div>
        )}

        {/* ABA: SANIDADE */}
        {activeTab === 'sanidade' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              Controle Sanitário do Rebanho
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('sanidade', sanidade, setSanidade, { animal_id: '', tipo_evento: 'Vacina', produto_utilizado: '', dosagem: '', proxima_aplicacao: '' });
            }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ID do Animal / Lote</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Brinco 102 ou Rebanho Geral"
                    value={sanidade.animal_id} 
                    onChange={(e) => setSanidade({ ...sanidade, animal_id: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Tipo de Evento</label>
                  <select 
                    value={sanidade.tipo_evento} 
                    onChange={(e) => setSanidade({ ...sanidade, tipo_evento: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Vacina">Vacina</option>
                    <option value="Vermífugo">Vermífugo</option>
                    <option value="Medicamento">Medicamento</option>
                    <option value="Exame">Exame</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Produto Utilizado</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nome da vacina/remédio"
                    value={sanidade.produto_utilizado} 
                    onChange={(e) => setSanidade({ ...sanidade, produto_utilizado: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Dosagem</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 5 ml"
                    value={sanidade.dosagem} 
                    onChange={(e) => setSanidade({ ...sanidade, dosagem: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Próxima Aplicação (Opcional)</label>
                <input 
                  type="date" 
                  value={sanidade.proxima_aplicacao} 
                  onChange={(e) => setSanidade({ ...sanidade, proxima_aplicacao: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Salvar Registro Sanitário'}
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
