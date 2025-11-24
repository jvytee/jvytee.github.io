{
  description = "Personal website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      eachSystem = nixpkgs.lib.genAttrs systems;
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
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
