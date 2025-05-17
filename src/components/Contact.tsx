
import ContactForm from "./contact/ContactForm";
import ContactInformation from "./contact/ContactInformation";

const Contact = () => {
  return (
    <section id="contato" className="bg-brand-gray py-16">
      <div className="container-section">
        <h2 className="section-title text-center mx-auto">Entre em Contato</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Estamos prontos para ajudar seu provedor a crescer. Preencha o formulário abaixo e nossa equipe entrará em contato com você em breve.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInformation />
        </div>
      </div>
    </section>
  );
};

export default Contact;
