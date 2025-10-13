set -e

JMETER_HOME="/opt/jmeter/apache-jmeter-5.6.3"
RESULTS_DIR="$1"
REPORT_DIR="${RESULTS_DIR}/dashboard"

if [ -z "$RESULTS_DIR" ]; then
  echo " Uso: $0 <directorio con .jtl>"
  exit 1
fi

if [ ! -f "$RESULTS_DIR/master.jtl" ]; then
  echo "No se encontró master.jtl en $RESULTS_DIR"
  exit 1
fi

echo " Generando dashboard en $REPORT_DIR ..."
$JMETER_HOME/bin/jmeter -g "$RESULTS_DIR/master.jtl" -o "$REPORT_DIR"

echo " Dashboard generado en: $REPORT_DIR"
echo " Podés abrirlo con:  firefox $REPORT_DIR/index.html"
