
set -e

AGENTS=("192.168.1.64", "192.168.1.63")
JMETER_DIR="/opt/jmeter"
JMETER_HOME="$JMETER_DIR/apache-jmeter-5.6.3"

FILES=(
  "test-plans/"
  "config/"
  "data/"
  "lib/ext/"
)
