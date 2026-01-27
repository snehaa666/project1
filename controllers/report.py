# controllers/report.py

from core.responses import send_json
from services.report_service import service_get_enrollment_report


def get_enrollment_report(handler):
    try:
        rows = service_get_enrollment_report()
        return send_json(handler, rows)

    except Exception as e:
        print("Enrollment report error:", e)
        return send_json(handler, {"error": str(e)}, 500)
