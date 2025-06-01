{
  description = "Personal website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      eachSystem = nixpkgs.lib.genAttrs systems;
    in {
      devShell = eachSystem (system:
        with import nixpkgs { inherit system; };
        mkShell {
          nativeBuildInputs = [
            yaml-language-server
            zola
          ];
        }
      );
    };
}
