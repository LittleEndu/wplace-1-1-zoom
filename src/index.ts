import { PluginDefinition } from "@placecharity/framework-types";
import patches from "plugin:patches";
import load from "./load";

const voidFunction = () => {};

export default {
  patches,
  init: voidFunction,
  load,
} as PluginDefinition;
