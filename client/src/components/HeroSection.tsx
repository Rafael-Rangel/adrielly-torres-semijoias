export default function HeroSection() {
  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-1_1770739742000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTFfMTc3MDczOTc0MjAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fm9C2zwu8LSmAh1IRiAweL~36LZ5AwOlwC5hP7pQP2ZcDc0vYovbSSRqSCd7HR-utorORYc5cwT67b65Z2LLZOvyxDFuRHakwuZ8ionHHFz0AgqxFbSl4ZnC8YPp8J2rG7UrM07yewYINAXPVC14cKNxqA7NOCSMeXfjvOW4XvepaKGZohIIW58g2JUGoDJVw4Ge7Skz7chs6rEjo4HzEktUU3EHeXpjJFenxnitnFALdiiYzrA611tqzqrMhdBfuw6UtxjppzvCk-u8TBx8obyGrpFK3QsX2DRdNnQbBrv1RotYIj3-Akfer2~XQ-EuTjvy4L-fRic43oXd2Ukjjw__)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Semijoias com Qualidade e Elegância
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Descubra nossa coleção exclusiva de semijoias. Cada peça é cuidadosamente selecionada para destacar sua beleza.
          </p>
          <div className="flex gap-4">
            <a
              href="#produtos"
              className="btn-primary inline-block"
            >
              EXPLORAR PRODUTOS
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-block"
            >
              FALE COMIGO NO WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
