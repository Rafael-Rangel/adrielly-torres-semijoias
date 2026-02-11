/**
 * Produtos mockados completos
 * Este arquivo contém todos os produtos para demonstração
 */

export interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
  promocao?: boolean;
}

export const mockProducts: Product[] = [
  // ANÉIS (10 produtos)
  { id: '1', nome: 'Anel Dourado Clássico', categoria: 'ANÉIS', preco: 89.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Anel elegante em ouro com acabamento sofisticado', disponivel: true },
  { id: '2', nome: 'Anel Prata Minimalista', categoria: 'ANÉIS', preco: 69.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Anel fino em prata com design minimalista e moderno', disponivel: true },
  { id: '3', nome: 'Anel Solitário com Pedra', categoria: 'ANÉIS', preco: 149.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Anel com pedra central brilhante em ouro dourado', disponivel: true },
  { id: '4', nome: 'Anel Entrelaçado Dourado', categoria: 'ANÉIS', preco: 119.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Anel com design entrelaçado em ouro elegante e único', disponivel: true },
  { id: '5', nome: 'Anel Coração Dourado', categoria: 'ANÉIS', preco: 79.90, imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop', descricao: 'Anel delicado com formato de coração em ouro', disponivel: true },
  { id: '6', nome: 'Anel Infinity Prata', categoria: 'ANÉIS', preco: 94.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Anel com símbolo infinito em prata polida', disponivel: true },
  { id: '7', nome: 'Anel Gema Azul', categoria: 'ANÉIS', preco: 179.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Anel com gema azul brilhante em ouro', disponivel: true },
  { id: '8', nome: 'Anel Vintage Dourado', categoria: 'ANÉIS', preco: 129.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Anel estilo vintage com detalhes trabalhados', disponivel: true },
  { id: '67', nome: 'Anel de Noivado Clássico', categoria: 'ANÉIS', preco: 299.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Anel de noivado com pedra central em ouro', disponivel: true },
  { id: '75', nome: 'Anel Promoção Especial', categoria: 'ANÉIS', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Anel em promoção com desconto especial', disponivel: true, promocao: true },
  
  // BRINCOS (10 produtos)
  { id: '11', nome: 'Brinco Gota Cristal', categoria: 'BRINCOS', preco: 79.90, imagem: 'https://images.unsplash.com/photo-1617038260897-41a1f14b2c7b?w=800&h=800&fit=crop', descricao: 'Brinco com cristal brilhante e acabamento delicado', disponivel: true },
  { id: '12', nome: 'Brinco Argola Dourada', categoria: 'BRINCOS', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Brinco argola em ouro dourado clássico e versátil', disponivel: true },
  { id: '13', nome: 'Brinco Pérola Elegante', categoria: 'BRINCOS', preco: 99.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Brinco com pérola natural e detalhes em ouro', disponivel: true },
  { id: '14', nome: 'Brinco Borboleta Prata', categoria: 'BRINCOS', preco: 69.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Brinco delicado com formato de borboleta em prata', disponivel: true },
  { id: '15', nome: 'Brinco Argola Grande Dourada', categoria: 'BRINCOS', preco: 89.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Brinco argola grande em ouro dourado', disponivel: true },
  { id: '16', nome: 'Brinco Gota Dupla Prata', categoria: 'BRINCOS', preco: 74.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Brinco com duas gotas em prata elegante', disponivel: true },
  { id: '17', nome: 'Brinco Estrela Dourada', categoria: 'BRINCOS', preco: 64.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Brinco formato estrela em ouro brilhante', disponivel: true },
  { id: '18', nome: 'Brinco Coração Prata', categoria: 'BRINCOS', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop', descricao: 'Brinco coração delicado em prata', disponivel: true },
  { id: '19', nome: 'Brinco Tufo Dourado', categoria: 'BRINCOS', preco: 109.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Brinco tufo com múltiplas pérolas em ouro', disponivel: true },
  { id: '76', nome: 'Brinco Promoção Dourado', categoria: 'BRINCOS', preco: 39.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Brinco em promoção com preço especial', disponivel: true, promocao: true },
  
  // COLARES (12 produtos)
  { id: '21', nome: 'Colar Coração Minimalista', categoria: 'COLARES', preco: 119.90, imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop', descricao: 'Colar fino com pingente de coração em ouro', disponivel: true },
  { id: '22', nome: 'Colar Malha Fina Dourada', categoria: 'COLARES', preco: 129.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Colar com malha fina e acabamento em ouro dourado', disponivel: true },
  { id: '23', nome: 'Colar Pérolas Clássico', categoria: 'COLARES', preco: 179.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Colar com pérolas naturais e fecho em ouro', disponivel: true },
  { id: '25', nome: 'Cordão Ouro Masculino', categoria: 'COLARES', preco: 159.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Cordão em ouro dourado com corrente resistente', disponivel: true },
  { id: '26', nome: 'Cordão Prata com Pingente', categoria: 'COLARES', preco: 139.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Cordão em prata com pingente geométrico', disponivel: true },
  { id: '27', nome: 'Cordão Dourado Grosso', categoria: 'COLARES', preco: 199.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Cordão grosso em ouro dourado estilo hip-hop', disponivel: true },
  { id: '28', nome: 'Colar Choker Dourado', categoria: 'COLARES', preco: 89.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Colar choker em ouro dourado ajustável', disponivel: true },
  { id: '29', nome: 'Colar Layered Prata', categoria: 'COLARES', preco: 149.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Conjunto de colares em camadas em prata', disponivel: true },
  { id: '30', nome: 'Colar Nameplate Dourado', categoria: 'COLARES', preco: 119.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Colar nameplate personalizado em ouro', disponivel: true },
  { id: '31', nome: 'Colar Corrente Grossa Prata', categoria: 'COLARES', preco: 169.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Colar com corrente grossa em prata', disponivel: true },
  { id: '32', nome: 'Colar Infinity Dourado', categoria: 'COLARES', preco: 99.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Colar com símbolo infinito em ouro', disponivel: true },
  { id: '77', nome: 'Colar Promoção Prata', categoria: 'COLARES', preco: 79.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Colar em promoção com desconto imperdível', disponivel: true, promocao: true },
  
  // PULSEIRAS (10 produtos)
  { id: '33', nome: 'Pulseira Feminina Dourada', categoria: 'PULSEIRAS', preco: 69.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Pulseira ajustável com brilho suave em ouro', disponivel: true },
  { id: '34', nome: 'Pulseira Elos Dourados', categoria: 'PULSEIRAS', preco: 99.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Pulseira com elos dourados e design elegante', disponivel: true },
  { id: '35', nome: 'Pulseira Prata Delicada', categoria: 'PULSEIRAS', preco: 79.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Pulseira fina em prata com charme discreto', disponivel: true },
  { id: '36', nome: 'Pulseira Tennis Dourada', categoria: 'PULSEIRAS', preco: 149.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Pulseira tennis com pedras brilhantes em ouro', disponivel: true },
  { id: '37', nome: 'Pulseira Charm Dourada', categoria: 'PULSEIRAS', preco: 119.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Pulseira com charms personalizados em ouro', disponivel: true },
  { id: '38', nome: 'Pulseira Corrente Prata', categoria: 'PULSEIRAS', preco: 89.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Pulseira com corrente em prata ajustável', disponivel: true },
  { id: '39', nome: 'Pulseira Bangle Dourada', categoria: 'PULSEIRAS', preco: 94.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Pulseira bangle rígida em ouro', disponivel: true },
  { id: '40', nome: 'Pulseira Cuff Prata', categoria: 'PULSEIRAS', preco: 109.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Pulseira cuff aberta em prata', disponivel: true },
  { id: '41', nome: 'Pulseira Infinity Dourada', categoria: 'PULSEIRAS', preco: 84.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Pulseira com símbolo infinito em ouro', disponivel: true },
  { id: '78', nome: 'Pulseira Promoção Dourada', categoria: 'PULSEIRAS', preco: 49.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Pulseira em promoção com preço reduzido', disponivel: true, promocao: true },
  
  // PIERCINGS (8 produtos)
  { id: '43', nome: 'Piercing Prata Liso', categoria: 'PIERCINGS', preco: 39.90, imagem: 'https://images.unsplash.com/photo-1589987607627-616cacb7f83a?w=800&h=800&fit=crop', descricao: 'Piercing simples em prata polida', disponivel: true },
  { id: '44', nome: 'Piercing Ouro com Cristal', categoria: 'PIERCINGS', preco: 49.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Piercing em ouro com detalhe em cristal', disponivel: true },
  { id: '45', nome: 'Piercing Argola Prata', categoria: 'PIERCINGS', preco: 34.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Piercing argola pequena em prata', disponivel: true },
  { id: '46', nome: 'Piercing Stud Dourado', categoria: 'PIERCINGS', preco: 44.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Piercing stud com pedra em ouro', disponivel: true },
  { id: '47', nome: 'Piercing Helix Prata', categoria: 'PIERCINGS', preco: 54.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Piercing helix em prata com detalhes', disponivel: true },
  { id: '48', nome: 'Piercing Conch Dourado', categoria: 'PIERCINGS', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Piercing conch em ouro elegante', disponivel: true },
  { id: '49', nome: 'Piercing Tragus Prata', categoria: 'PIERCINGS', preco: 49.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Piercing tragus em prata minimalista', disponivel: true },
  { id: '50', nome: 'Piercing Rook Dourado', categoria: 'PIERCINGS', preco: 64.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Piercing rook em ouro com design único', disponivel: true },
  
  // PINGENTES (10 produtos)
  { id: '51', nome: 'Pingente Lua Delicada', categoria: 'PINGENTES', preco: 49.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Pingente em formato de lua crescente em prata', disponivel: true },
  { id: '52', nome: 'Pingente Estrela Dourada', categoria: 'PINGENTES', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Pingente estrela em ouro dourado brilhante', disponivel: true },
  { id: '53', nome: 'Pingente Cruz Prata', categoria: 'PINGENTES', preco: 44.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Pingente cruz em prata com acabamento polido', disponivel: true },
  { id: '54', nome: 'Pingente Coração Dourado', categoria: 'PINGENTES', preco: 54.90, imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop', descricao: 'Pingente coração em ouro dourado delicado', disponivel: true },
  { id: '55', nome: 'Pingente Anjo Prata', categoria: 'PINGENTES', preco: 64.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Pingente anjo em prata com detalhes trabalhados', disponivel: true },
  { id: '56', nome: 'Pingente Flor Dourada', categoria: 'PINGENTES', preco: 69.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Pingente flor em ouro com design delicado', disponivel: true },
  { id: '57', nome: 'Pingente Chave Prata', categoria: 'PINGENTES', preco: 54.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Pingente chave em prata vintage', disponivel: true },
  { id: '58', nome: 'Pingente Infinity Dourado', categoria: 'PINGENTES', preco: 59.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Pingente símbolo infinito em ouro', disponivel: true },
  { id: '59', nome: 'Pingente Gota Prata', categoria: 'PINGENTES', preco: 49.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Pingente gota em prata brilhante', disponivel: true },
  { id: '60', nome: 'Pingente Árvore Dourada', categoria: 'PINGENTES', preco: 74.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Pingente árvore da vida em ouro', disponivel: true },
  
  // ACESSÓRIOS (6 produtos)
  { id: '61', nome: 'Óculos Fashion Preto', categoria: 'ACESSÓRIOS', preco: 149.90, imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop', descricao: 'Óculos moderno com armação preta elegante', disponivel: true },
  { id: '62', nome: 'Relógio Dourado Feminino', categoria: 'ACESSÓRIOS', preco: 249.90, imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', descricao: 'Relógio elegante em ouro dourado com pulseira', disponivel: true },
  { id: '63', nome: 'Broche Floral Prata', categoria: 'ACESSÓRIOS', preco: 89.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Broche com design floral em prata polida', disponivel: true },
  { id: '64', nome: 'Tiara Dourada Elegante', categoria: 'ACESSÓRIOS', preco: 179.90, imagem: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', descricao: 'Tiara delicada em ouro dourado para ocasiões especiais', disponivel: true },
  { id: '65', nome: 'Óculos Vintage Dourado', categoria: 'ACESSÓRIOS', preco: 169.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Óculos estilo vintage com armação dourada', disponivel: true },
  { id: '66', nome: 'Relógio Prata Masculino', categoria: 'ACESSÓRIOS', preco: 219.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Relógio masculino em prata com pulseira de couro', disponivel: true },
  
  // CONJUNTOS (5 produtos)
  { id: '70', nome: 'Conjunto Anel e Brinco Dourado', categoria: 'CONJUNTOS', preco: 249.90, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', descricao: 'Conjunto completo anel e brincos em ouro', disponivel: true },
  { id: '71', nome: 'Conjunto Colar e Brinco Prata', categoria: 'CONJUNTOS', preco: 229.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Conjunto colar e brincos em prata elegante', disponivel: true },
  { id: '72', nome: 'Conjunto Completo Dourado', categoria: 'CONJUNTOS', preco: 399.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Conjunto completo anel colar e brincos em ouro', disponivel: true },
  { id: '73', nome: 'Conjunto Pulseira e Anel Prata', categoria: 'CONJUNTOS', preco: 189.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Conjunto pulseira e anel em prata', disponivel: true },
  { id: '79', nome: 'Conjunto Promoção Completo', categoria: 'CONJUNTOS', preco: 199.90, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', descricao: 'Conjunto completo em promoção especial', disponivel: true, promocao: true },
  
  // PRODUTOS VIP (5 produtos)
  { id: '80', nome: 'Anel VIP Dourado', categoria: 'ANÉIS', preco: 399.90, imagem: 'https://images.unsplash.com/photo-1588444650736-3b6f1c9c5e5b?w=800&h=800&fit=crop', descricao: 'Anel VIP exclusivo com pedras preciosas', disponivel: true },
  { id: '81', nome: 'Brinco VIP Prata', categoria: 'BRINCOS', preco: 299.90, imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&h=800&fit=crop', descricao: 'Brinco VIP com design exclusivo em prata', disponivel: true },
  { id: '82', nome: 'Colar VIP Dourado', categoria: 'COLARES', preco: 449.90, imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&h=800&fit=crop', descricao: 'Colar VIP com pedras e design exclusivo', disponivel: true },
  { id: '83', nome: 'Pulseira VIP Prata', categoria: 'PULSEIRAS', preco: 349.90, imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', descricao: 'Pulseira VIP com detalhes exclusivos', disponivel: true },
  { id: '84', nome: 'Conjunto VIP Completo', categoria: 'CONJUNTOS', preco: 899.90, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', descricao: 'Conjunto VIP completo com peças exclusivas', disponivel: true },
];
