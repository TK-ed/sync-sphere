"use client";
import { TextGenerateEffect } from "./TextGenerator";

const words = `SyncSphere is your digital sanctuary, a cutting-edge storage web app
designed to seamlessly synchronize and safeguard your files in the
cloud. Effortlessly navigate the realms of data organization as
Sync.Sphere harmonizes simplicity with powerful features. Embrace
the future of cloud storage.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
