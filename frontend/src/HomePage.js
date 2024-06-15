import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-purple-900 text-white py-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex justify-between items-center px-4 relative z-10 h-full">
          <h1 className="text-2xl font-bold text-white">Archives Sage</h1>
          <div className="flex items-center">
            <button
              onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
              onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
              onClick={goToLogin}
              className="text-sm mr-4 px-4 py-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
            >
              Login
            </button>
            <button
              onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
              onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
              onClick={goToRegister}
              className="text-sm px-4 py-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
            >
              Get Start
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow relative bg-[url('/img/Bguniverse.png')] bg-cover flex justify-center items-center">
        <div className="container mx-auto flex items-center">
          <section className="w-1/2 p-4 flex justify-center ">
            <div className="shadow-xl w-full flex items-center justify-center bg-white bg-opacity-15  backdrop-blur-lg rounded-lg border">
              <div className="hero p-6">
                <h2 className="card-title text-black font-extrabold">Archives Sage</h2>
                <p className="text-lg text-black font-bold">
                  "Explorar o cosmos nunca foi tão fácil! Com o ArchivesSage Tutor, mergulhe em uma jornada educacional. Nossa plataforma inovadora utiliza inteligência artificial para desvendar os segredos, permitindo que você carregue documentos para o nosso assistente virtual, Sage. O Sage, com sua 'sabedoria' virtual, analisa esses materiais e fornece respostas personalizadas, capacitando você a explorar ao infinito e além. Prepare-se para uma experiência educacional além dos limites!"
                </p>
              </div>
            </div>
          </section>
          <section className="w-1/2 p-4 flex justify-center">
            <div className="maincontainer bg-logo bg-cover">
              <div className="thecard">
                <div className="thefront bg-logo bg-cover">
                </div>
                <div className="theback bg-logo">
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Direitos Autorais © 2024 Archive Sage. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

