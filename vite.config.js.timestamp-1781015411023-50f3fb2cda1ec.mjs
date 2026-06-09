// vite.config.js
import { defineConfig } from "file:///sessions/blissful-quirky-galileo/mnt/TourIscrizione/tour-iscrizione-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/blissful-quirky-galileo/mnt/TourIscrizione/tour-iscrizione-frontend/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3e3,
    // Proxy verso WP locale — solo per sviluppo locale
    proxy: {
      "/wp-json": {
        target: "http://touriscrizione.local",
        changeOrigin: true
      },
      "/wp-content": {
        target: "http://touriscrizione.local",
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvYmxpc3NmdWwtcXVpcmt5LWdhbGlsZW8vbW50L1RvdXJJc2NyaXppb25lL3RvdXItaXNjcml6aW9uZS1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2JsaXNzZnVsLXF1aXJreS1nYWxpbGVvL21udC9Ub3VySXNjcml6aW9uZS90b3VyLWlzY3JpemlvbmUtZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Nlc3Npb25zL2JsaXNzZnVsLXF1aXJreS1nYWxpbGVvL21udC9Ub3VySXNjcml6aW9uZS90b3VyLWlzY3JpemlvbmUtZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgLy8gUHJveHkgdmVyc28gV1AgbG9jYWxlIFx1MjAxNCBzb2xvIHBlciBzdmlsdXBwbyBsb2NhbGVcbiAgICBwcm94eToge1xuICAgICAgJy93cC1qc29uJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vdG91cmlzY3JpemlvbmUubG9jYWwnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgICAgJy93cC1jb250ZW50Jzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vdG91cmlzY3JpemlvbmUubG9jYWwnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WixTQUFTLG9CQUFvQjtBQUN0YixPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBRU4sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
