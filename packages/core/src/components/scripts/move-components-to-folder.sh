#!/bin/bash
# for filename in ./*.tsx; do
#     [ -f "$filename" ] || continue  # Skip if not a file
#     filename_without_ext="${filename##*/}"  # Remove path
#     filename_without_ext="${filename_without_ext%.tsx}"  # Remove extension

#     mkdir $filename_without_ext && mv $filename "$filename_without_ext/index.tsx"

#     echo "FILENAME: $filename_without_ext"
# done

moveFolders() {
    for dir in ActivityIndicator Badge Banner CrossFadeIcon Divider Icon MaterialCommunityIcon Modal ProgressBar Searchbar Snackbar Surface; do
        [ -d "$dir" ] || continue  # Skip if not a directory

        tsx_file="$dir/$dir.tsx"
        index_file="$dir/index.tsx"

        if [ -f "$tsx_file" ]; then
            mv "$tsx_file" "$index_file"
            echo "Renamed: $tsx_file -> $index_file"
        fi
    done
}

# Call the function
moveFolders
