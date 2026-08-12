import { create } from 'zustand';

interface InstitutionStore {
    selectedInstitutionId: string | null;
    setSelectedInstitutionId: (id: string | null) => void;
}

export const useInstitutionStore = create<InstitutionStore>((set) => ({
    selectedInstitutionId: null,
    setSelectedInstitutionId: (id) => set({ selectedInstitutionId: id }),
}));
