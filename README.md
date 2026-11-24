# Diary App — Praktikum 08 (React Redux Toolkit)

Aplikasi buku harian sederhana dengan React Native + Expo Router dan Redux Toolkit.

## Cara Menjalankan

```
npm install @reduxjs/toolkit react-redux
npx expo start -c
```

Scan QR dengan Expo Go, atau tekan `a` untuk Android Emulator.

## Fitur

- Tambah diary (judul minimal 3 karakter, isi wajib, pilih mood)
- Lihat daftar diary di Home, dengan statistik Total Diary dan Total Favorite
- Filter Home berdasarkan mood
- Tandai dan hapus favorit (♥)
- Halaman Favorit, dengan tombol hapus semua favorit
- Detail diary, edit diary, dan hapus diary (dengan konfirmasi)
- Empty state di Home dan Favorit

## Pembagian State

| Jenis | Contoh | Tool | Lokasi |
|---|---|---|---|
| Local state | Isi form Tambah dan Edit, mood yang dipilih di form, filter mood di Home | `useState` | `create.tsx`, `edit/[id].tsx`, `index.tsx` |
| Global state | Daftar diary, status favorit | Redux Toolkit | `src/features/diary/diarySlice.ts` |
| Persistent database | Belum ada. Data hilang saat aplikasi di-reload | — | Akan dibahas di pertemuan berikutnya |

Filter mood di Home disimpan sebagai local state, karena hanya dipakai di layar Home. Reducer `setFilter` tetap tersedia di slice sesuai modul, tetapi belum dipakai di UI.

## Struktur Folder

```
app/
  _layout.tsx          Root layout + Provider Redux
  (tabs)/
    _layout.tsx        Navigasi tab
    index.tsx          Home
    create.tsx         Tambah diary
    favorites.tsx      Favorit
  detail/[id].tsx      Detail diary
  edit/[id].tsx        Edit diary
src/
  app/store.ts         configureStore
  app/hooks.ts         useAppDispatch dan useAppSelector (typed)
  features/diary/diarySlice.ts   Slice: addDiary, editDiary, toggleFavorite, deleteDiary, clearAllFavorites, setFilter
  components/DiaryCard.tsx
  components/MoodPicker.tsx
  styles/tokens.ts     Design tokens (warna, spasi, radius, ukuran font)
```

## Istilah Redux yang Dipakai

- **Store**: pusat data aplikasi (`store.ts`)
- **Slice**: state + reducer + action untuk satu fitur (`diarySlice.ts`)
- **Action**: deskripsi kejadian, misalnya `addDiary`
- **Reducer**: aturan perubahan state di dalam slice
- **Dispatch**: mengirim action ke store (`useAppDispatch`)
- **Selector**: membaca bagian state (`useAppSelector`)
- **Provider**: membuat store bisa diakses semua layar (`app/_layout.tsx`)

## Catatan

- Data tidak tersimpan permanen. Setelah aplikasi di-reload, data kembali ke data awal.
- Redux adalah memory state, bukan database.
