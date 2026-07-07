import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  SafeAreaView 
} from 'react-native';

const VAGAS_MOCK = [
  { id: '1', titulo: 'Jovem Aprendiz em Administração', empresa: 'Tech Soluções', habilidades: 'Excel básico, Boa comunicação' },
  { id: '2', titulo: 'Estágio em Suporte de TI', empresa: 'Global Net', habilidades: 'Lógica de programação, Proatividade' },
  { id: '3', titulo: 'Auxiliar de Logística', empresa: 'LogBrasil', habilidades: 'Trabalho em equipe, Organização' },
];

const CURSOS_MOCK = [
  { id: '1', nome: 'Como se comportar em uma Entrevista', duracao: '2h', status: 'Baixado (Disponível Offline)' },
  { id: '2', nome: 'Introdução ao Pacote Office', duracao: '5h', status: 'Baixado (Disponível Offline)' },
  { id: '3', nome: 'Comunicação Assertiva no Trabalho', duracao: '3h', status: 'Disponível online' },
];

export default function RootLayout() {
  const [abaAtual, setAbaAtual] = useState('vagas'); 
  const [nome, setNome] = useState('');
  const [habilidadesUsuario, setHabilidadesUsuario] = useState('');
  const [vagas, setVagas] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    setVagas(VAGAS_MOCK);
    setCursos(CURSOS_MOCK);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StartJob 🚀</Text>
        <Text style={styles.headerSubtitle}>Seu primeiro passo profissional</Text>
      </View>

      {/* --- CONTEÚDO DINÂMICO --- */}
      <View style={styles.content}>
        
        {/* TELA DE VAGAS */}
        {abaAtual === 'vagas' && (
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Vagas Disponíveis</Text>
            <Text style={styles.infoInclusao}>* Endereços ocultados para garantir processos seletivos mais justos.</Text>
            <FlatList
              data={vagas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardSub}>{item.empresa}</Text>
                  <Text style={styles.cardHabilidades}>Requisitos: {item.habilidades}</Text>
                  <TouchableOpacity style={styles.buttonCandidatar}>
                    <Text style={styles.buttonText}>Quero me candidatar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        {/* TELA DE CURSOS */}
        {abaAtual === 'cursos' && (
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Cursos Gratuitos</Text>
            <FlatList
              data={cursos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  <Text style={styles.cardSub}>Duração: {item.duracao}</Text>
                  <Text style={[styles.cardStatus, item.status.includes('Offline') ? styles.offline : styles.online]}>
                    {item.status}
                  </Text>
                  <TouchableOpacity style={styles.buttonAcessar}>
                    <Text style={styles.buttonText}>Começar Aula</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        {/* TELA DE CURRÍCULO */}
        {abaAtual === 'curriculo' && (
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Criador de Currículo Sem Complicação</Text>
            
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: Gustavo Alaiko" 
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Suas Habilidades e Pontos Fortes:</Text>
            <TextInput 
              style={[styles.input, { height: 80 }]} 
              placeholder="Ex: Boa comunicação, pontual..." 
              multiline={true}
              value={habilidadesUsuario}
              onChangeText={setHabilidadesUsuario}
            />

            <TouchableOpacity style={styles.buttonSalvar}>
              <Text style={styles.buttonText}>Salvar no Perfil</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

      </View>

      {/* --- MENU INFERIOR --- */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, abaAtual === 'vagas' && styles.navButtonActive]} 
          onPress={() => setAbaAtual('vagas')}
        >
          <Text style={styles.navText}>Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, abaAtual === 'cursos' && styles.navButtonActive]} 
          onPress={() => setAbaAtual('cursos')}
        >
          <Text style={styles.navText}>Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, abaAtual === 'curriculo' && styles.navButtonActive]} 
          onPress={() => setAbaAtual('curriculo')}
        >
          <Text style={styles.navText}>Currículo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { backgroundColor: '#2E5BFF', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: '#E0E6FF', marginTop: 4 },
  content: { flex: 1, padding: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1C24', marginBottom: 10 },
  infoInclusao: { fontSize: 12, color: '#059669', marginBottom: 15, fontWeight: '600' },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#E4E7EB' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1C24' },
  cardSub: { fontSize: 14, color: '#64748B', marginTop: 2 },
  cardHabilidades: { fontSize: 13, color: '#334155', marginTop: 8, fontStyle: 'italic' },
  cardStatus: { fontSize: 12, fontWeight: 'bold', marginTop: 5 },
  offline: { color: '#059669' },
  online: { color: '#D97706' },
  buttonCandidatar: { backgroundColor: '#2E5BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 12 },
  buttonAcessar: { backgroundColor: '#059669', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, padding: 10, fontSize: 14, color: '#1A1C24' },
  buttonSalvar: { backgroundColor: '#2E5BFF', padding: 15, borderRadius: 6, alignItems: 'center', marginTop: 25 },
  navBar: { flexDirection: 'row', height: 60, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E4E7EB' },
  navButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navButtonActive: { borderTopWidth: 3, borderTopColor: '#2E5BFF', backgroundColor: '#F0F4FF' },
  navText: { fontSize: 14, fontWeight: '600', color: '#1A1C24' },
});