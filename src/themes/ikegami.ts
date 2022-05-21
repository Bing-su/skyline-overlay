import type { ColorsDataBasics, ColorsPreset } from '.';
import { DSRKafuU } from './authors';

const commonColors: ColorsDataBasics = {
  common: [64, 64, 64],
  self: [118, 118, 118],
  ticker: {
    cd: [255, 111, 0],
    c: [255, 202, 40],
    d: [29, 233, 182],
    oh: [229, 57, 53],
    h: [0, 230, 118],
    s: [64, 196, 255],
  },
};

// different color presets
export const presets: ColorsPreset[] = [
  {
    key: 'default',
    name: 'Default',
    data: {
      ...commonColors,
      jobtype: {
        dps: [189, 15, 73],
        tank: [23, 124, 207],
        healer: [95, 153, 51],
      },
    },
  },
  {
    key: 'colorful',
    name: 'Colorful',
    data: {
      ...commonColors,
      job: {
        pld: [21, 28, 100],
        war: [153, 23, 23],
        drk: [136, 14, 79],
        gnb: [78, 52, 46],
        whm: [117, 117, 117],
        sch: [121, 134, 203],
        ast: [121, 85, 72],
        sge: [79, 195, 247],
        mnk: [245, 124, 0],
        drg: [63, 81, 181],
        nin: [211, 47, 47],
        sam: [255, 202, 40],
        rpr: [255, 160, 0],
        brd: [158, 157, 36],
        mch: [0, 151, 167],
        dnc: [244, 143, 177],
        blm: [126, 87, 194],
        smn: [46, 125, 50],
        rdm: [233, 30, 99],
        blu: [0, 185, 247],
      },
    },
  },
];

export default {
  name: 'ikegami',
  author: DSRKafuU,
  presets,
};
