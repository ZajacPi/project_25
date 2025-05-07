import { passwords } from "@/lib/passwords"
import { CipherComponent } from "./CipherComponent"

export const MysteryList = () => {
  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-background">
      <h1 className="text-2xl font-semibold">Password Input with Hints</h1>
      <div className="flex flex-row gap-3 items-center justify-center">
        {passwords.map((password, i) => (
          <CipherComponent
            key={i}
            password={password.password}
            photoURL={password.photoURL}
            // className="relative flex items-center justify-center w-32 h-32 border border-gray-300 rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  )
}