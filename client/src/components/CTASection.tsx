import { MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div
          className="relative rounded-lg overflow-hidden h-96 flex items-center justify-center"
          style={{
            backgroundImage:
              'url(https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-5_1770739748000_na1fn_Y3RhLWJhbm5lcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTVfMTc3MDczOTc0ODAwMF9uYTFmbl9ZM1JoTFdKaGJtNWxjZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HL-kOzOZ4-MXp4LgcMl42-tR1Pp1s5bqcSCr0gxA9lViyUmG3vVTV6z-jjik6FaAW4bvRiSBlA6FwbHNbliGCNB5lXRmjuTSg~L0XCyXw81yYGJnQVAdSulx-jn1cBvchFCvsmdcU1CCu9MlNLIMmuZUi-hWe1otC02brB3ajo7g8ziPYCVNgKQ~Z1zouY5AcYheHhPRTOcA__)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative text-center text-white max-w-2xl px-4">
            <h2 className="text-4xl font-bold mb-4">
              Quer Revender Conosco?
            </h2>
            <p className="text-lg mb-8">
              Junte-se a mais de 15 mil revendedoras. Comissão de até 50% e suporte completo.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-opacity-90 transition-all"
            >
              <MessageCircle size={20} />
              FALE COMIGO AGORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
