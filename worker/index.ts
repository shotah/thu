export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/health") {
      console.log(JSON.stringify({ message: "health", path }));
      return Response.json({ ok: true });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler;
