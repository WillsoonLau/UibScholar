import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { Select } from "@/src/components/ui/Select";
import { useAuth } from "@/src/context/auth";
import { PUBLICATION_TYPES, STUDY_PROGRAMS } from "@/src/data/programs";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View>
      <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">{label}</Text>
      {children}
    </View>
  );
}

export default function SubmitResearch() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [index, setIndex] = useState<string>();
  const [program, setProgram] = useState<string>();
  const [link, setLink] = useState("");
  const [error, setError] = useState<string>();

  // Hanya Dosen, Alumni, Mahasiswa yang boleh mengajukan. Server tetap harus memeriksa ulang.
  if (!user || user.role === "Umum") return <Redirect href="/home" />;

  const onSubmit = () => {
    if (!title.trim() || !journal.trim() || !index || !/^https?:\/\//i.test(link.trim())) {
      return setError("Isi judul, nama jurnal, indeks jurnal, dan tautan (diawali http:// atau https://).");
    }
    setError(undefined);
    // TODO(DEC-13): kirim ke server; masuk antrean admin untuk dicek manual sebelum Terverifikasi.
    Alert.alert(
      "Pengajuan terkirim",
      "Penelitianmu masuk antrean verifikasi. Admin akan memeriksa tautan dan metadata sebelum ditampilkan sebagai Terverifikasi.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Ajukan Penelitian" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="gap-4 px-5 pb-10" keyboardShouldPersistTaps="handled">
          <Text className="font-poppins text-xs leading-5 text-muted">
            Masukkan metadata dan tautan langsung ke halaman jurnal. File PDF tidak disimpan di UIBScholar.
          </Text>
          <Field label="Judul Penelitian">
            <Input placeholder="Judul" value={title} onChangeText={setTitle} />
          </Field>
          <Field label="Nama Jurnal">
            <Input placeholder="Nama jurnal" value={journal} onChangeText={setJournal} />
          </Field>
          <Select label="Indeks Jurnal" value={index} options={PUBLICATION_TYPES} onChange={setIndex} placeholder="Pilih indeks" allowAll={false} />
          <Select label="Program Studi" value={program} options={STUDY_PROGRAMS} onChange={setProgram} placeholder="Pilih program studi" allowAll={false} />
          <Field label="Tautan ke Jurnal">
            <Input placeholder="https://..." value={link} onChangeText={setLink} autoCapitalize="none" keyboardType="url" error={error} />
          </Field>
          <View className="mt-2">
            <Button label="Kirim untuk Verifikasi" onPress={onSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
