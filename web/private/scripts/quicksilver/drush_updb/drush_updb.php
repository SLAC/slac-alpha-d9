<?php
echo "Performing any necessary db updates...\n";
passthru('drush updb -y');
echo "DB updates complete.\n";
