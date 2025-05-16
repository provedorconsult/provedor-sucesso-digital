
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Canal do Provedor</h3>
            <p className="text-gray-300">
              Soluções completas para provedores de internet, garantindo estabilidade, eficiência e crescimento do seu negócio.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <p className="text-gray-300 mb-2">BR 070 KM 18 GLEBA 4 LOTE 494</p>
            <p className="text-gray-300 mb-2">CEP: 72227-993, Ceilândia Norte</p>
            <p className="text-gray-300 mb-2">Brasília – DF</p>
            <p className="text-gray-300 mb-2">Tel: (61) 9 9618-8786</p>
            <p className="text-gray-300">Email: contato@canaldoprovedor.net.br</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-300 hover:text-white">Início</a></li>
              <li><a href="#sobre" className="text-gray-300 hover:text-white">Por Que Nós</a></li>
              <li><a href="#servicos" className="text-gray-300 hover:text-white">Serviços</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-white">Contato</a></li>
              <li><a href="https://www.youtube.com/@canaldoprovedorbr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Canal do Provedor. CNPJ: 39.945.364/0001-80. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
