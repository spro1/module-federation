import { createApp } from "vue";
import TestOption from "@/components/TestOption.vue";

export default function(selector) {
    return createApp(TestOption).mount(selector);
}