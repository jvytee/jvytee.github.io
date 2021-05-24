with import <nixpkgs> {};

mkShell {
  nativeBuildInputs = [
    nodejs_latest
  ];
}
