import Link from "next/link";
import {titleFont} from "@/config/fonts";

export default async function Home() {

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                      <div className="space-y-2">
                          <h1 className={`${ titleFont.className } text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none`}>
                              Welcome to Habitasks!
                          </h1>
                          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                              Discover Habitasks: Manage tasks, assign responsibilities and receive email notifications. Simplify your life with us.
                          </p>
                      </div>
                      <div className="w-full max-w-sm space-y-2">
                          <div className="flex space-x-2">
                              <Link className="flex-1 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300" href="/auth/login">Sign In</Link>
                              <Link className="flex-1 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300" href="/auth/register">Sign Up</Link>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                              System microservice & events by{' '} Santiago Gaona{' - '}
                              <Link className="underline underline-offset-2" href="https://habitanto.com/">
                                  Habitanto
                              </Link>
                          </p>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
}
