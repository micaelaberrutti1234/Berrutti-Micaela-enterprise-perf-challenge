set -e

JMETER_HOME="/opt/jmeter/apache-jmeter-5.6.3"
TEST_PLAN="test-plans/basic-user-journey.jmx"
PROPERTIES="config/production.properties"
RESULTS_DIR="reports/run-$(date +%Y%m%d_%H%M%S)"

REMOTE_HOSTS=$(grep ^remote.hosts $PROPERTIES | cut -d= -f2)

mkdir -p "$RESULTS_DIR"

echo "Ejecutando plan de prueba distribuido..."
$JMETER_HOME/bin/jmeter \
  -n \
  -t "$TEST_PLAN" \
  -R "$REMOTE_HOSTS" \
  -Gbase.url=localhost \
  -Gauth.port=8081 \
  -Guser.port=8082 \
  -Gproduct.port=8083 \
  -l "$RESULTS_DIR/master.jtl" \
  -q "$PROPERTIES"

echo "Test finalizado. Resultados en $RESULTS_DIR"
