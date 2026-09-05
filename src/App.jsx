import React, { useState } from 'react';
import { PlusCircle, FileText, CheckCircle, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    tipo: 'Despesa',
    categoria: 'Manutenção',
    objeto: 'Veículos',
    item: 'Óleo e Filtros',
    bem: 'S10',
    pessoa: 'Ronaldo',
    valor: '',
    observacao: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Lançamento de R$ ${formData.valor} salvo com sucesso!`);
    setFormData({ ...formData, valor: '', observacao: '' });
  };

  return (
    

      {/* Cabeçalho Responsivo */}
      
        
Gestão do Sítio

        PWA Active
      

      {/* Conteúdo Dinâmico */}
      
        {activeTab === 'dashboard' && (
          

            {/* Cards Financeiros */}
            

              

                Receitas
                
R$ 12.450

              

              

                Despesas
                
R$ 5.820

              

              

                Saldo Mês
                
R$ 6.630

              

            

            {/* Ação Rápida */}
             setActiveTab('novo_lancamento')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow"
            >
               Novo Lançamento Rápido
            
          

        )}

        {activeTab === 'novo_lancamento' && (
          

            
Novo Lançamento

            
              

                Tipo
                
                  Despesa
                  Receita
                
              


              
                

                  Objeto
                  
                    Veículos
                    Combustíveis
                    Ração
                    Serviços
                  
                

                

                  Bem / Área
                  
                    S10
                    Trator Azul
                    Campo Bom
                  
                

              

              

                Valor (R$)
                
              


              
                Salvar Lançamento
              
            
          

        )}
      

      {/* Menu Inferior (Mobile Footer) */}
      
         setActiveTab('dashboard')} className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-blue-600 font-bold' : ''}`}>
           Resumo
        
         setActiveTab('novo_lancamento')} className={`flex flex-col items-center ${activeTab === 'novo_lancamento' ? 'text-blue-600 font-bold' : ''}`}>
           Lançar
        
      
    

  );
}

