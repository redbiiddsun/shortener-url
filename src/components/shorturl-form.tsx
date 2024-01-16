import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";




export function Shorturlform({ onSubmit }: { onSubmit?: any }) {

  const formSchema = z.object({
    targeturl: z.string().url(),
    pathurl: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targeturl: "",
      pathurl: ""
    },
  })


  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="originalURL">Original URL</Label>
          <Input id="originalURL" placeholder="http://example.com" type="url" {...form.register("targeturl")} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accessLink">Access Link</Label>
          <Input id="accessLink" placeholder="Your custom link" type="text" {...form.register("pathurl")} required/>
        </div>
      </div>
      <Button className="w-full mt-4 py-2 rounded-b-md" type="submit">
        Shorten URL
      </Button>
    </form>
  )
}