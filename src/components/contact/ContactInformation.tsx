
import React from 'react';

const ContactInformation = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold text-brand-darkblue mb-6">Informações de Contato</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Endereço</h4>
              <p className="text-gray-700">BR 070 KM 18 GLEBA 4 LOTE 494</p>
              <p className="text-gray-700">CEP: 72227-993</p>
              <p className="text-gray-700">Bairro: Ceilândia Norte</p>
              <p className="text-gray-700">Brasília – DF</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Telefone</h4>
              <p className="text-gray-700">(61) 9 9618-8786</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">E-mail</h4>
              <p className="text-gray-700">contato@canaldoprovedor.net.br</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">CNPJ</h4>
              <p className="text-gray-700">39.945.364/0001-80</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-brand-darkblue mb-4">Nos Siga</h3>
        <div className="flex space-x-4">
          <a href="https://www.youtube.com/@canaldoprovedorbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
