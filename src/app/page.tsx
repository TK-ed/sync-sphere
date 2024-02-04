import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { supabase } from "../../supabase";

export default async function Home() {
  const { data, error } = await supabase.storage.from("files").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "desc" },
  });

  console.log(data);

  return (
    <main>
      <div className="flex flex-col lg:flex-row bg-[#1E1919] dark:bg-slate-800 items-center mt-1">
        <div className="flex flex-col bg-[#2b2929] p-10 space-y-5 text-white dark:bg-slate-800">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="sync">Sync.Sphere</span>
            <br /> <br />
            Where Your Data Finds Harmony in the Cloud.
          </h1>
          <p className="pb-20">
            SyncSphere is your digital sanctuary, a cutting-edge storage web app
            designed to seamlessly synchronize and safeguard your files in the
            cloud. Effortlessly navigate the realms of data organization as
            Sync.Sphere harmonizes simplicity with powerful features. Embrace
            the future of cloud storage.
          </p>
          <h3 className="text-4xl mt-4">Embrace Sync.Sphere!!</h3>
          <Link
            href={"/dashboard"}
            className="flex items-center p-5 cursor-pointer bg-blue-600 w-fit"
          >
            Try it for free!
            <ArrowRightIcon className="ml-5" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-xl">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser doesnt support video tag
          </video>
        </div>
      </div>
    </main>
  );
}
