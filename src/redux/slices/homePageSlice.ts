import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomePageBlock, HomePageLayoutRow } from '@/types/HomePageLayout';

interface HomePageLayoutState {
  rows: HomePageLayoutRow[];
  loading: boolean;
  error: string | null;
}

const initialState: HomePageLayoutState = {
  rows: [],
  loading: false,
  error: null,
};

const homePageLayoutSlice = createSlice({
  name: 'homePageLayout',
  initialState,
  reducers: {
    resetLayout: (state) => {
      state.rows = [];
    },

    setLayout: (state, action: PayloadAction<HomePageLayoutRow[]>) => {
      state.rows = action.payload;
    },

    addRow: (state) => {
      const newRow = {
        order: state.rows.length,
        blocks: [],
      };
      state.rows.push(newRow);
    },

    removeRow: (state, action: PayloadAction<number>) => {
      state.rows.splice(action.payload, 1);
      state.rows.forEach((row, i) => (row.order = i));
    },

    addBlockToRow: (
      state,
      action: PayloadAction<{ rowIndex: number; block: HomePageBlock }>
    ) => {
      const { rowIndex, block } = action.payload;
      state.rows[rowIndex].blocks.push(block);
    },

    updateBlock: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        blockIndex: number;
        updates: Partial<HomePageBlock>;
      }>
    ) => {
      const { rowIndex, blockIndex, updates } = action.payload;
      const block = state.rows[rowIndex].blocks[blockIndex];
      state.rows[rowIndex].blocks[blockIndex] = { ...block, ...updates };
    },

    removeBlock: (
      state,
      action: PayloadAction<{ rowIndex: number; blockIndex: number }>
    ) => {
      const { rowIndex, blockIndex } = action.payload;
      state.rows[rowIndex].blocks.splice(blockIndex, 1);
    },
  },
});

export const {
  resetLayout,
  setLayout,
  addRow,
  removeRow,
  addBlockToRow,
  updateBlock,
  removeBlock,
} = homePageLayoutSlice.actions;

export default homePageLayoutSlice.reducer;