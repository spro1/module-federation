import { createApp } from "vue";
import TestComposition from "@/components/TestComposition.vue";

export default function(selector) {
    return createApp(TestComposition).mount(selector);
}