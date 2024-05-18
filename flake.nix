{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-23.11";
  };

  outputs = { self, nixpkgs }: {
    devShells.x86_64-linux.default = with import nixpkgs { system = "x86_64-linux"; };
      mkShell {
        packages = [
          nodejs_21
          yaml-language-server
          zola
        ];
      };
  };
}
