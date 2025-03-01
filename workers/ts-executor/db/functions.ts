import pool, { queryDB } from ".";

export async function checkDbConnection() {
  await pool.query("SELECT 1");
}

export const getAllJobDataformWorkflowId = async (workflowId: string) => {
  const query = `
      SELECT 
          id, 
          name, 
          description, 
          workflow_id, 
          app, 
          step_no, 
          type, 
          data, 
          created_at, 
          updated_at
      FROM "Job"
      WHERE workflow_id = $1
      ORDER BY step_no ASC;
    `;
  const res = await queryDB(query, [workflowId]);
  if (res.result != "success") {
    console.error(res.details);
    throw new Error(res.errorMessage);
  }
  const d = res.queryResult?.rows as any;
  console.log(d[1].data);
};

export async function updateJobResult(
  executionId: string,
  result: any
): Promise<any> {
  const query = `
    UPDATE "Execution"
    SET 
      results = results || $1::jsonb, 
      job_index = job_index + 1, 
      total_job_executed = total_job_executed + 1
    WHERE id = $2
    RETURNING *;
  `;
  const res = await queryDB(query, [executionId, result]);
  if (res.result != "success") {
    console.error(`Job result update failed, executionId:${executionId}`);
    throw new Error(res.errorMessage);
  }
  const r = res.queryResult?.rows[0];
  if (r.job_count == r.total_job_executed) {
    const s = await markExecutionCompleted(executionId);
    return {
      completed: true,
      success: true,
    };
  }
  return {
    completed: false,
    success: true,
  };
}

export async function markExecutionCompleted(executionId: string) {
  const query = `
        UPDATE "Execution"
        SET 
            status = 'completed',
            finished_at = NOW()
        WHERE id = $1
    `;
  const res = await queryDB(query, [executionId]);
  if (res.result != "success") {
    console.error(
      `Failed to mark execution as completed, executionId:${executionId}`
    );
    throw new Error(res.errorMessage);
  }
  return res;
}

export async function markExecutionFailed(
  executionId: string,
  errorMessage: string
) {
  const query = `
      UPDATE "Execution"
      SET 
        status = 'failed',
        finished_at = NOW(),
        error = $2
      WHERE id = $1
      RETURNING *;
    `;

  const res = await queryDB(query, [executionId, errorMessage]);
  if (res.result != "success") {
    console.error(
      `Failed to mark execution as failed, executionId:${executionId}`
    );
    throw new Error(res.errorMessage);
  }
  return res;
}
