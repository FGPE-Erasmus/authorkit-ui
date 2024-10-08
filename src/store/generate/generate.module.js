import generateService from "@/api/generate.service";

import { GENERATE } from "./generate.constants";

const actions = {
  [GENERATE]: () => {
    return generateService.generate();
  }
};

export default {
  actions
};
